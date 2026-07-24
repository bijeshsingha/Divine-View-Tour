import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

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
  packageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  packageSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  detailsBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: 'bold',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 5,
  },
  dayBlock: {
    marginBottom: 15,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#f39c12',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 8,
  },
  dayRoute: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  stopList: {
    marginLeft: 15,
    marginTop: 5,
  },
  stopItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 10,
    color: '#f39c12',
    marginRight: 5,
  },
  stopText: {
    fontSize: 11,
    color: '#34495e',
  },
  inclusionSection: {
    marginTop: 10,
  },
  incExcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incExcCol: {
    width: '48%',
  },
  listContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  listIconInc: {
    fontSize: 10,
    color: '#27ae60',
    marginRight: 5,
  },
  listIconExc: {
    fontSize: 10,
    color: '#c0392b',
    marginRight: 5,
  },
  listText: {
    fontSize: 10,
    color: '#2c3e50',
    width: '90%',
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

// Use a placeholder if image path is local since React-PDF needs absolute URLs for network or valid local paths.
// In a real app we might pass full URL. We'll try passing the relative path directly; if it fails, we fallback to a remote image.
const FALLBACK_IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop";

export const PackagePDF = ({ packageData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Divine View Tours</Text>
            <Text style={styles.subtitle}>Curated Readymade Package</Text>
          </View>
        </View>

        {/* Hero Image */}
        <Image style={styles.heroImage} src={FALLBACK_IMG} />
        
        {/* Package Title & Overview */}
        <Text style={styles.packageTitle}>{packageData.title}</Text>
        <Text style={styles.packageSubtitle}>{packageData.subtitle}</Text>
        
        <View style={styles.detailsBox}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{packageData.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Estimated Price</Text>
            <Text style={styles.detailValue}>₹{packageData.price.toLocaleString()} / person</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{packageData.category}</Text>
          </View>
        </View>

        {/* Itinerary */}
        <Text style={styles.sectionTitle}>Day-by-Day Itinerary</Text>
        
        {packageData.itinerary && packageData.itinerary.map((day, idx) => (
          <View style={styles.dayBlock} key={idx} wrap={false}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayLabel}>DAY {idx + 1}</Text>
              <Text style={styles.dayRoute}>{day.route || day.title}</Text>
            </View>
            <View style={styles.stopList}>
              {(day.stops || day.activities).map((stop, sIdx) => (
                <View style={styles.stopItem} key={sIdx}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.stopText}>{stop}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Inclusions & Exclusions */}
        {packageData.inclusions && packageData.exclusions && (
          <View style={styles.inclusionSection} wrap={false}>
            <Text style={styles.sectionTitle}>Inclusions & Exclusions</Text>
            <View style={styles.incExcRow}>
              
              <View style={styles.incExcCol}>
                <View style={styles.listContainer}>
                  {packageData.inclusions.map((inc, idx) => (
                    <View style={styles.listItem} key={idx}>
                      <Text style={styles.listIconInc}>✓</Text>
                      <Text style={styles.listText}>{inc}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.incExcCol}>
                <View style={styles.listContainer}>
                  {packageData.exclusions.map((exc, idx) => (
                    <View style={styles.listItem} key={idx}>
                      <Text style={styles.listIconExc}>✗</Text>
                      <Text style={styles.listText}>{exc}</Text>
                    </View>
                  ))}
                </View>
              </View>

            </View>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer} fixed>
          Thank you for choosing Divine View Tours. Prices are estimates and subject to change. 
          Specific hotel names and vehicle numbers will be provided upon booking confirmation.
        </Text>

      </Page>
    </Document>
  );
};
