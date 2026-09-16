/**
 * Google Apps Script Webhook & Live Database for Divine View Tours
 * 
 * FEATURES:
 * 1. Automatically pre-populates previous archived bookings (#0 to #6) on first run.
 * 2. Strictly guarantees incrementing serial numbers (#7, #8, #9...) even on serverless Vercel.
 * 3. Serves GET requests so the /admin/enquiries dashboard displays live Google Sheet data.
 * 4. Generates direct 1-tap WhatsApp links for each customer.
 * 
 * INSTRUCTIONS FOR GOOGLE SHEETS:
 * 1. Open your Google Sheet: "Divine View Tours - Live Bookings 2026"
 * 2. In the top menu, click: Extensions > Apps Script
 * 3. Select all existing text (Ctrl+A / Cmd+A), DELETE it, and PASTE this entire code below.
 * 4. Click the blue "Deploy" button (top-right) > "New deployment".
 * 5. Click the gear icon ⚙️ next to "Select type" > select "Web app".
 * 6. Set:
 *    - Description: Divine View Tours Live Bookings Webhook
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
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Initialize headers & archive records if sheet is completely fresh
    ensureHeadersAndArchive(sheet);

    // Compute strictly incrementing sequential serial number based on row count
    var rowCount = sheet.getLastRow();
    // Headers is Row 1. If 7 archived items exist (Rows 2-8), next row is Row 9 -> Serial #7
    var serialNumber = Math.max(7, rowCount - 1);
    var serialPadded = ("0000" + serialNumber).slice(-4);
    var reference = "DVT-2026-" + serialPadded;

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
    ensureHeadersAndArchive(sheet);

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
      if (isNaN(serialNum)) serialNum = i - 1;

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

function ensureHeadersAndArchive(sheet) {
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
      "Operations / Payment Notes"
    ];
    sheet.appendRow(headers);

    // Brand forest green header styling
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#103F36");
    headerRange.setFontColor("#F7F3E9");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    sheet.setFrozenRows(1);

    // Pre-populate initial records #0 through #6
    var initialArchive = [
      ["16 Sept 2026, 03:11 PM", "DVT-2026-0000", "#0", "Archive Lead 0", "+916026504087", "https://wa.me/916026504087", "info@divineviewtours.com", "WHATSAPP", "PACKAGE", "Meghalaya Scenic", "2026-09-17", "5 Days", "2 Adults", "Guwahati", "Initial seed", "Archived", "", "", ""],
      ["16 Sept 2026, 03:12 PM", "DVT-2026-0001", "#1", "Archive Lead 1", "+916026504087", "https://wa.me/916026504087", "info@divineviewtours.com", "WHATSAPP", "PACKAGE", "Meghalaya Scenic", "2026-09-17", "5 Days", "2 Adults", "Guwahati", "Initial seed", "Archived", "", "", ""],
      ["16 Sept 2026, 03:13 PM", "DVT-2026-0002", "#2", "Archive Lead 2", "+916026504087", "https://wa.me/916026504087", "info@divineviewtours.com", "WHATSAPP", "PACKAGE", "Meghalaya Scenic", "2026-09-17", "5 Days", "2 Adults", "Guwahati", "Initial seed", "Archived", "", "", ""],
      ["16 Sept 2026, 05:50 PM", "DVT-2026-0003", "#3", "Bijesh Singha", "+917002449198", "https://wa.me/917002449198", "singhabijesh7@gmail.com", "WHATSAPP", "VEHICLE_HIRE", "Same-Day Shillong Roundtrip", "2026-09-17", "1 Day", "Ertiga", "Guwahati Airport", "", "Archived", "", "", ""],
      ["16 Sept 2026, 07:52 PM", "DVT-2026-0004", "#4", "jamuna singha", "+917002369611", "https://wa.me/917002369611", "singhabijesh7@gmail.com", "WHATSAPP", "PACKAGE", "Meghalaya Escape: Waterfalls & Living Roots", "2026-09-17", "5 Days", "2 Adults", "Guwahati Airport", "", "Archived", "", "", ""],
      ["16 Sept 2026, 08:09 PM", "DVT-2026-0005", "#5", "Bijesh Singha", "+917002449198", "https://wa.me/917002449198", "singhabijesh7@gmail.com", "WHATSAPP", "PACKAGE", "Meghalaya Escape: Waterfalls & Living Roots", "2026-09-17", "5 Days", "2 Adults", "Guwahati Airport", "", "Archived", "", "", ""],
      ["16 Sept 2026, 09:15 PM", "DVT-2026-0006", "#6", "jamuna singha", "+917002369611", "https://wa.me/917002369611", "singhabijesh7@gmail.com", "WHATSAPP", "CUSTOM_TRIP", "Custom Northeast Holiday Itinerary", "October 2026", "5 Days", "2 Adults", "Guwahati Airport", "Customizing based on package: meghalaya-5-day-tour-from-guwahati", "Archived", "", "", ""]
    ];

    for (var j = 0; j < initialArchive.length; j++) {
      sheet.appendRow(initialArchive[j]);
    }
  }
}
