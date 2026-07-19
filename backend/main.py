from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from sqlalchemy import create_engine, Column, Integer, String, Date, Boolean, Text
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import date

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Setup (SQLite for local, easily swappable to PostgreSQL)
DATABASE_URL = "sqlite:///./divine_view.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class ShuttleInventory(Base):
    __tablename__ = "shuttle_inventory"
    departure_date = Column(Date, primary_key=True)
    max_seats = Column(Integer, default=12)
    booked_seats = Column(Integer, default=0)

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    check_in_date = Column(String(20))
    traveler_count = Column(Integer)
    transport_type = Column(String(20))
    custom_request = Column(Text, nullable=True)
    is_custom_route = Column(Boolean, default=False)

Base.metadata.create_all(bind=engine)

# Pydantic Models
class BookingRequest(BaseModel):
    checkInDate: str
    region: str
    tripDays: int
    travelerCount: int
    spots: List[str]
    transportType: str
    privateCarType: Optional[str] = None
    stayType: str
    restaurants: List[str]
    customRequest: Optional[str] = None

@app.get("/api/config")
def get_config():
    # Load config from data.json to keep existing frontend logic
    with open("data.json", "r") as f:
        return json.load(f)

@app.post("/api/calculate")
def calculate_booking(request: BookingRequest):
    db = SessionLocal()
    try:
        if request.transportType == 'shuttle':
            from datetime import datetime
            dep_date = datetime.strptime(request.checkInDate, "%Y-%m-%d").date()
            
            # Check inventory
            inventory = db.query(ShuttleInventory).filter(ShuttleInventory.departure_date == dep_date).first()
            if not inventory:
                inventory = ShuttleInventory(departure_date=dep_date, max_seats=12, booked_seats=0)
                db.add(inventory)
            
            if inventory.booked_seats + request.travelerCount > inventory.max_seats:
                raise HTTPException(status_code=400, detail="Not enough seats available on the Daily Shuttle for this date. Please select Private Fleet.")
            
            # Update inventory
            inventory.booked_seats += request.travelerCount
        
        # Create Lead
        lead = Lead(
            check_in_date=request.checkInDate,
            traveler_count=request.travelerCount,
            transport_type=request.transportType,
            custom_request=request.customRequest,
            is_custom_route=bool(request.customRequest and request.customRequest.strip() != "")
        )
        db.add(lead)
        db.commit()
        
        base_cost = 800 if request.transportType == 'shuttle' else 2500
        total_cost = (base_cost * request.travelerCount * request.tripDays)
        
        msg = f"Hi! I'd like to book a trip to {request.region} for {request.travelerCount} people on {request.checkInDate}. Transport: {request.transportType}."
        if request.customRequest:
            msg += f" Custom request: {request.customRequest}"
            
        import urllib.parse
        
        return {
            "status": "success", 
            "totalCost": total_cost,
            "whatsappMessage": urllib.parse.quote(msg)
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/api/admin/manifest/{target_date}")
def get_manifest(target_date: str):
    db = SessionLocal()
    try:
        from datetime import datetime
        dep_date = datetime.strptime(target_date, "%Y-%m-%d").date()
        inventory = db.query(ShuttleInventory).filter(ShuttleInventory.departure_date == dep_date).first()
        
        leads = db.query(Lead).filter(Lead.check_in_date == target_date, Lead.transport_type == 'shuttle').all()
        
        return {
            "date": target_date,
            "total_seats": inventory.max_seats if inventory else 12,
            "booked_seats": inventory.booked_seats if inventory else 0,
            "passengers": [{"id": l.id, "count": l.traveler_count, "custom": l.custom_request} for l in leads]
        }
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
