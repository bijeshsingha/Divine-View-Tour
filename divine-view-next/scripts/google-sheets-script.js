/**
 * Google Apps Script Webhook for Divine View Tours
 * 
 * INSTRUCTIONS FOR GOOGLE SHEETS:
 * 1. Open Google Sheets (sheets.google.com) and create a new blank spreadsheet.
 * 2. Title it: "Divine View Tours - Live Bookings 2026"
 * 3. In the top menu, click: Extensions > Apps Script
 * 4. Delete any existing code in the editor, and paste this entire code below.
 * 5. Click the blue "Deploy" button (top right) > "New deployment".
 * 6. Click the gear icon next to "Select type" > select "Web app".
 * 7. Set:
 *    - Description: Divine View Tours Live Bookings Webhook
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone"
 * 8. Click "Deploy" (authorize access if prompted).
 * 9. Copy the "Web app URL" (it starts with https://script.google.com/macros/s/...)
 * 10. Paste this URL into your .env.local and Vercel Environment Variables:
 *     GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for any concurrent execution
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Auto-create professional styled headers if the sheet is fresh
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
      
      // Brand green header styling
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#103F36");
      headerRange.setFontColor("#F7F3E9");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Arial");
      sheet.setFrozenRows(1);
    }

    var row = [
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.reference || "",
      data.serialNumber || "",
      data.customerName || "",
      data.phone || "",
      data.whatsappLink || "",
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
      "", // Assigned Driver (fill manually by operations)
      "", // Vehicle Allocated (fill manually by operations)
      ""  // Payment / Ops Notes
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row appended successfully",
      reference: data.reference
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
