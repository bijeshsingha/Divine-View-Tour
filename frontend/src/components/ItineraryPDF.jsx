import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#f1c40f',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  heroImage: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
    borderRadius: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 5,
  },
  detailsBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    width: '30%',
    fontSize: 11,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  detailValue: {
    width: '70%',
    fontSize: 11,
    color: '#2c3e50',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timeColumn: {
    width: '25%',
    paddingRight: 10,
    borderRightWidth: 2,
    borderRightColor: '#f1c40f',
  },
  contentColumn: {
    width: '75%',
    paddingLeft: 15,
  },
  timeText: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'right',
    marginBottom: 2,
  },
  timeHighlight: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'right',
  },
  spotName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  spotRegion: {
    fontSize: 10,
    color: '#95a5a6',
    marginBottom: 3,
  },
  spotDuration: {
    fontSize: 10,
    color: '#34495e',
    fontStyle: 'italic',
  },
  quoteContainer: {
    marginTop: 30,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quoteLabel: {
    fontSize: 12,
    color: '#34495e',
  },
  quoteValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  quoteTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#bdc3c7',
  },
  quoteTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  quoteTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#bdc3c7',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 10,
  }
});

// A standard placeholder hero image URL for the PDF
const HERO_IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop";

export const ItineraryPDF = ({ guestName, regionName, schedule, pricing, data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Divine View Tours</Text>
            <Text style={styles.subtitle}>{regionName} Custom Itinerary</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 10, color: '#7f8c8d' }}>Prepared for</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2c3e50' }}>{guestName || 'Guest'}</Text>
          </View>
        </View>

        {/* Hero Image */}
        <Image style={styles.heroImage} src={HERO_IMG} />
        
        {/* Trip Overview */}
        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trip Dates:</Text>
            <Text style={styles.detailValue}>{data.checkInDate} ({data.tripDays} Days)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Travelers:</Text>
            <Text style={styles.detailValue}>{data.travelerCount} Persons</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup Location:</Text>
            <Text style={styles.detailValue}>{data.isDivineGuest ? `Hotel Divine View (Room: ${data.roomNumber || 'TBD'})` : (data.roomNumber || 'Not specified')}</Text>
          </View>
          {data.restaurants && data.restaurants.length > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Selected Restaurants:</Text>
              <Text style={styles.detailValue}>{data.restaurants.join(', ')}</Text>
            </View>
          )}
          {data.customRequest && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Custom Requests:</Text>
              <Text style={styles.detailValue}>{data.customRequest}</Text>
            </View>
          )}
        </View>

        {/* Timeline Section */}
        <Text style={styles.sectionTitle}>Your Driving Schedule</Text>
        
        {schedule && schedule.map((stop, index) => (
          <View style={styles.timelineItem} key={index}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeHighlight}>{stop.arrivalTime}</Text>
              {stop.departureTime && (
                <>
                  <Text style={styles.timeText}>to</Text>
                  <Text style={styles.timeHighlight}>{stop.departureTime}</Text>
                </>
              )}
            </View>
            <View style={styles.contentColumn}>
              <Text style={styles.spotName}>{stop.name}</Text>
              <Text style={styles.spotRegion}>{stop.region}</Text>
              {stop.driveTimeMins > 0 && (
                <Text style={styles.spotDuration}>Drive Time: {stop.driveTimeMins} mins</Text>
              )}
              {stop.durationMins > 0 && (
                <Text style={styles.spotDuration}>Activity Duration: {stop.durationMins} mins</Text>
              )}
            </View>
          </View>
        ))}

        {/* Quote Section */}
        <View style={styles.quoteContainer} wrap={false}>
          <Text style={[styles.sectionTitle, { marginTop: 0, borderBottomWidth: 0 }]}>Pricing Quote</Text>
          
          <View style={styles.quoteRow}>
            <Text style={styles.quoteLabel}>Base Region Cost ({pricing.travelerCount} pax x {pricing.tripDays} days)</Text>
            <Text style={styles.quoteValue}>₹{pricing.baseCost.toLocaleString()}</Text>
          </View>
          
          <View style={styles.quoteRow}>
            <Text style={styles.quoteLabel}>Transport ({pricing.transportDetail})</Text>
            <Text style={styles.quoteValue}>₹{pricing.carCost.toLocaleString()}</Text>
          </View>
          
          <View style={styles.quoteRow}>
            <Text style={styles.quoteLabel}>Accommodation ({pricing.stayDetail})</Text>
            <Text style={styles.quoteValue}>₹{pricing.stayCost.toLocaleString()}</Text>
          </View>

          <View style={styles.quoteTotal}>
            <Text style={styles.quoteTotalLabel}>Total Estimated Price</Text>
            <Text style={styles.quoteTotalValue}>₹{pricing.totalCost.toLocaleString()}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer} fixed>
          Thank you for choosing Divine View Tours. Prices are estimates and subject to availability. 
          Food and restaurant bills are expensed by the customer directly.
        </Text>

      </Page>
    </Document>
  );
};
