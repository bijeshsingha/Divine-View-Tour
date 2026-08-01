import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts for standard, bold, and italic
Font.register({
  family: 'Roboto',
  fonts: [
    { 
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400
    },
    { 
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700
    },
    { 
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontStyle: 'italic'
    }
  ]
});

const colors = {
  brandblue: '#2980b9',
  branddark: '#2c3e50',
  brandgray: '#ecf0f1',
  brandgreen: '#27ae60',
  brandred: '#c0392b',
  gray: '#7f8c8d'
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
    marginBottom: 20
  },
  headerLeft: {
    color: colors.brandblue,
    fontSize: 12,
    fontWeight: 'bold'
  },
  headerRight: {
    color: colors.gray,
    fontSize: 12
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 35,
    right: 35,
    textAlign: 'center',
    color: colors.gray,
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 10
  },
  centerTitleBlock: {
    alignItems: 'center',
    marginBottom: 15
  },
  mainTitle: {
    fontSize: 22,
    color: colors.branddark,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subTitle: {
    fontSize: 11,
    color: colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 1.4,
    paddingHorizontal: 20,
    hyphens: 'none'
  },
  box1: {
    borderWidth: 1,
    borderColor: colors.branddark,
    borderRadius: 4,
    marginBottom: 15,
    overflow: 'hidden'
  },
  box1Title: {
    backgroundColor: colors.branddark,
    color: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: 'bold'
  },
  box1Content: {
    backgroundColor: colors.brandgray,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box2: {
    borderWidth: 1,
    borderColor: colors.brandblue,
    borderRadius: 4,
    marginBottom: 15,
    overflow: 'hidden'
  },
  box2Title: {
    backgroundColor: colors.brandblue,
    color: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: 'bold'
  },
  box2Content: {
    backgroundColor: '#ffffff',
    padding: 12
  },
  col: {
    width: '48%'
  },
  fieldGroup: {
    marginBottom: 10
  },
  fieldLabel: {
    color: colors.brandblue,
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 2
  },
  fieldValue: {
    color: '#000000',
    fontSize: 11
  },
  packageCenterTitle: {
    fontSize: 16,
    color: colors.branddark,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4
  },
  packageSubTitle: {
    fontSize: 11,
    color: colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    hyphens: 'none'
  },
  hrule: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 12
  },
  summaryCols: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  sectionTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.brandblue,
    fontWeight: 'bold'
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 10
  },
  bullet: {
    width: 15,
    fontSize: 11,
    color: '#000000'
  },
  listText: {
    flex: 1,
    fontSize: 11,
    color: '#000000',
    lineHeight: 1.4,
    hyphens: 'none'
  },
  noteBox: {
    backgroundColor: colors.brandgray,
    borderRadius: 4,
    padding: 12,
    marginTop: 10
  }
});

export const BookingRequestPDF = ({ 
  data, 
  packageTitle, 
  durationStr, 
  basePrice, 
  totalPrice,
  bookingId 
}) => {
  const paxCount = `${data.travelerCount} Adult(s)` + (data.childrenCount ? `, ${data.childrenCount} Child(ren)` : '');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Universal Header */}
        <View style={styles.header} fixed>
          <Text style={styles.headerLeft}>Divine View Tours</Text>
          <Text style={styles.headerRight}>Booking Request Summary</Text>
        </View>

        {/* Center Title Block */}
        <View style={styles.centerTitleBlock}>
          <Text style={styles.mainTitle}>Booking Request Received</Text>
          <Text style={styles.subTitle}>
            Thank you for choosing Divine View Tours. Below is a summary of your requested trip details. Our team will contact you shortly to confirm availability and process payment.
          </Text>
        </View>

        {/* Box 1: Your Details */}
        <View style={styles.box1}>
          <View style={styles.box1Title}>
            <Text>Your Details</Text>
          </View>
          <View style={styles.box1Content}>
            <View style={styles.col}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Guest Name:</Text>
                <Text style={styles.fieldValue}>{data.name || 'Not Provided'}</Text>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Phone Number:</Text>
                <Text style={styles.fieldValue}>{data.phone || 'Not Provided'}</Text>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Email:</Text>
                <Text style={styles.fieldValue}>{data.email || 'Not Provided'}</Text>
              </View>
            </View>
            <View style={styles.col}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Number of Pax:</Text>
                <Text style={styles.fieldValue}>{paxCount}</Text>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Preferred Date:</Text>
                <Text style={styles.fieldValue}>{data.checkInDate || 'Not Provided'}</Text>
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Request ID:</Text>
                <Text style={styles.fieldValue}>#{bookingId}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Box 2: Requested Package Summary */}
        <View style={styles.box2}>
          <View style={styles.box2Title}>
            <Text>Requested Package Summary</Text>
          </View>
          <View style={styles.box2Content}>
            <Text style={styles.packageCenterTitle}>{packageTitle}</Text>
            
            <View style={styles.hrule} />
            
            <View style={styles.summaryCols}>
              <View style={styles.col}>
                <View style={styles.fieldGroup}>
                  <Text style={{fontWeight: 'bold', fontSize: 11, marginBottom: 2}}>Duration:</Text>
                  <Text style={styles.fieldValue}>{durationStr}</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={{fontWeight: 'bold', fontSize: 11, marginBottom: 2}}>Base Price:</Text>
                  <Text style={styles.fieldValue}>INR {basePrice.toLocaleString()} / person</Text>
                </View>
              </View>
              <View style={{...styles.col, alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text style={styles.totalLabel}>Estimated Total:</Text>
                <Text style={styles.totalValue}>INR {totalPrice.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
        </View>
        
        <View style={styles.listItem}>
          <Text style={styles.bullet}>--</Text>
          <Text style={styles.listText}>
            <Text style={{fontWeight: 'bold'}}>Verification: </Text>
            Our travel experts are currently reviewing your requested dates against our vehicle and hotel inventory.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>--</Text>
          <Text style={styles.listText}>
            <Text style={{fontWeight: 'bold'}}>Contact: </Text>
            You will receive a call or WhatsApp message on your registered number ({data.phone || 'N/A'}) within 12 hours.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>--</Text>
          <Text style={styles.listText}>
            <Text style={{fontWeight: 'bold'}}>Confirmation: </Text>
            Once availability is verified, we will send you a secure payment link for the token advance to lock in your booking.
          </Text>
        </View>

        {/* Note */}
        <View style={styles.noteBox} wrap={false}>
          <Text style={{ fontSize: 11, color: '#000000', lineHeight: 1.4, fontStyle: 'italic', hyphens: 'none' }}>
            <Text style={{fontWeight: 700, fontStyle: 'normal'}}>Note: </Text>
            This document is a summary of your booking request and does not serve as a final confirmed ticket. Final confirmations are dispatched upon receipt of the advance payment.
          </Text>
        </View>

        {/* Universal Footer */}
        <Text style={styles.footer} render={({ pageNumber }) => (
          `info@divineviewtours.com    |    +91 6026504087    |    Page ${pageNumber}`
        )} fixed />

      </Page>
    </Document>
  );
};
