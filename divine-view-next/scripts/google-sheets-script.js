/**
 * Google Apps Script Webhook & Live Database for Divine View Tours
 * 
 * FEATURES:
 * 1. Zero dummy data: only real customer bookings are recorded.
 * 2. Strictly guarantees incrementing serial numbers (#10, #11, #12...) even on serverless Vercel.
 * 3. Serves GET requests so the /admin/enquiries dashboard displays live Google Sheet data.
 * 4. Generates direct 1-tap WhatsApp links for each customer.
 * 
 * INSTRUCTIONS FOR GOOGLE SHEETS:
 * 1. Open your Google Sheet: "Divine View Tours - Live Bookings 2026"
 * 2. In the top menu, click: Extensions > Apps Script
 * 3. Select all existing text (Ctrl+A / Cmd+A), DELETE it, and PASTE this entire code below.
 * 4. Click the blue "Deploy" button (top-right) > "Manage deployments" or "New deployment".
 * 5. Click the gear icon ⚙️ next to "Select type" > select "Web app".
 * 6. Set:
 *    - Description: Divine View Tours Live Bookings Webhook v2
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone"  <-- CRITICAL!
 * 7. Click "Deploy".
 * 8. If prompted with "Authorization required":
 *    - Click "Review permissions" -> Select your Google Account.
 *    - Click "Advanced" -> Click "Go to Untitled project (unsafe)" -> Click "Allow".
 * 9. Copy the "Web app URL" (starts with https://script.google.com/macros/s/.../exec).
 * 10. Paste this URL into your .env.local and Vercel Environment Variables:
 *     GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for other concurrent executions to finish
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Initialize headers if sheet is completely fresh
    ensureHeaders(sheet);

    // Compute strictly incrementing sequential serial number based on row count and existing data
    var lastRow = sheet.getLastRow();
    var nextSerial = 10;
    if (lastRow > 1) {
      var lastVal = String(sheet.getRange(lastRow, 3).getValue() || "").replace(/[^0-9]/g, "");
      var parsedLast = parseInt(lastVal, 10);
      if (!isNaN(parsedLast) && parsedLast >= 0) {
        nextSerial = parsedLast + 1;
      } else {
        nextSerial = lastRow;
      }
    }

    var incomingSerial = data.serialNumber ? parseInt(String(data.serialNumber).replace(/[^0-9]/g, ""), 10) : NaN;
    var serialNumber = (!isNaN(incomingSerial) && incomingSerial >= nextSerial) ? incomingSerial : nextSerial;
    var serialPadded = ("0000" + serialNumber).slice(-4);
    var reference = (data.reference && data.reference.indexOf("DVT-2026-") === 0) ? data.reference : ("DVT-2026-" + serialPadded);

    var row = [
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      reference,
      "#" + serialNumber,
      data.customerName || "",
      data.phone || "",
      data.whatsappLink || (data.phone ? "https://wa.me/" + String(data.phone).replace(/[^0-9]/g, "") : ""),
      data.email || "",
      data.preferredContact || "",
      data.bookingType || "",
      data.packageOrRoute || "",
      data.startDate || "",
      data.duration || "",
      data.travellers || "",
      data.pickup || "",
      data.notes || "",
      data.status || "New",
      "", // Assigned Driver
      "", // Vehicle Allocated
      ""  // Operations / Payment Notes
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row appended successfully",
      serialNumber: serialNumber,
      reference: reference
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Allow /admin/enquiries to query the live sheet directly
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders(sheet);

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ success: true, enquiries: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var enquiries = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var rawSerial = String(row[2] || "").replace("#", "");
      var serialNum = parseInt(rawSerial, 10);
      if (isNaN(serialNum)) serialNum = i;

      enquiries.push({
        id: "sheet-" + i,
        createdAt: row[0],
        reference: String(row[1] || ""),
        serialNumber: serialNum,
        customerName: String(row[3] || ""),
        phone: String(row[4] || ""),
        email: String(row[6] || ""),
        preferredContact: String(row[7] || "whatsapp"),
        type: String(row[8] || "Tour").toLowerCase().replace(" ", "_"),
        packageTitle: String(row[9] || ""),
        routeName: String(row[9] || ""),
        startDate: String(row[10] || ""),
        tripDuration: String(row[11] || ""),
        travellers: String(row[12] || ""),
        pickup: String(row[13] || ""),
        notes: String(row[14] || ""),
        status: String(row[15] || "New").toLowerCase(),
        assignedDriver: String(row[16] || ""),
        vehicleAllocated: String(row[17] || ""),
        opsNotes: String(row[18] || "")
      });
    }

    // Newest enquiries first for the admin inbox
    enquiries.reverse();

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      total: enquiries.length,
      enquiries: enquiries
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Date & Time (IST)",
      "Reference Code",
      "Serial",
      "Customer Name",
      "Phone",
      "WhatsApp Direct Link",
      "Email",
      "Preferred Contact",
      "Booking Type",
      "Package / Route Name",
      "Travel Dates",
      "Duration",
      "Travellers",
      "Pickup Point",
      "Guest Notes",
      "Status",
      "Assigned Driver",
      "Vehicle Allocated",
      "Payment / Ops Notes"
    ];
    sheet.appendRow(headers);

    // Brand forest green header styling
    var hr = sheet.getRange(1, 1, 1, headers.length);
    hr.setBackground("#103F36");
    hr.setFontColor("#F7F3E9");
    hr.setFontWeight("bold");
    hr.setFontFamily("Arial");
    sheet.setFrozenRows(1);
  }
}
