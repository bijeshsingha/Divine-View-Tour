import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts for standard, bold, and italic
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' }
  ]
});

// Brand colors extracted from LaTeX
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
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
    marginBottom: 30
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
  // --- Footer ---
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
  // --- Center Title ---
  centerTitleBlock: {
    alignItems: 'center',
    marginBottom: 20
  },
  mainTitle: {
    fontSize: 18,
    color: colors.branddark,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subTitle: {
    fontSize: 11,
    color: colors.gray,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  // --- Info Box (tcolorbox) ---
  infoBox: {
    backgroundColor: colors.brandgray,
    borderRadius: 4,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  infoColLeft: {
    width: '60%'
  },
  infoColRight: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  infoTextRow: {
    flexDirection: 'row',
    marginBottom: 6
  },
  infoLabel: {
    color: colors.brandblue,
    fontWeight: 'bold',
    fontSize: 11,
    marginRight: 4
  },
  infoValue: {
    color: '#000000',
    fontSize: 11
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000'
  },
  // --- Sections ---
  sectionTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 15
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.brandblue,
    fontWeight: 'bold'
  },
  dayTitle: {
    fontSize: 14,
    color: colors.branddark,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
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
    lineHeight: 1.4
  },
  // --- Inclusions / Exclusions ---
  incExcContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  incExcCol: {
    width: '48%'
  },
  incExcTitle: {
    fontSize: 16,
    color: colors.brandblue,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4
  },
  incExcBulletPlus: {
    width: 15,
    fontSize: 11,
    color: colors.brandgreen,
    fontWeight: 'bold'
  },
  incExcBulletMinus: {
    width: 15,
    fontSize: 11,
    color: colors.brandred,
    fontWeight: 'bold'
  }
});

export const PackagePDF = ({ packageData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Universal Header */}
        <View style={styles.header} fixed>
          <Text style={styles.headerLeft}>Divine View Tours</Text>
          <Text style={styles.headerRight}>Package Itinerary</Text>
        </View>

        {/* Center Title Block */}
        <View style={styles.centerTitleBlock}>
          <Text style={styles.mainTitle}>{packageData.title}</Text>
          <Text style={styles.subTitle}>Best for: {packageData.subtitle}</Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoColLeft}>
            <View style={styles.infoTextRow}>
              <Text style={styles.infoLabel}>Duration:</Text>
              <Text style={styles.infoValue}>{packageData.duration}</Text>
            </View>
            <View style={styles.infoTextRow}>
              <Text style={styles.infoLabel}>Category:</Text>
              <Text style={styles.infoValue}>{packageData.category}</Text>
            </View>
          </View>
          <View style={styles.infoColRight}>
            <Text style={styles.priceText}>Price: INR {packageData.price.toLocaleString()} / person</Text>
          </View>
        </View>

        {/* Detailed Itinerary */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Detailed Itinerary</Text>
        </View>

        {packageData.itinerary && packageData.itinerary.map((day, idx) => (
          <View key={idx} wrap={false}>
            <Text style={styles.dayTitle}>Day {idx + 1}: {day.route || day.title}</Text>
            {(day.stops || day.activities).map((stop, sIdx) => (
              <View style={styles.listItem} key={sIdx}>
                <Text style={styles.bullet}>--</Text>
                <Text style={styles.listText}>{stop}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Inclusions & Exclusions */}
        <View style={styles.incExcContainer} wrap={false}>
          
          <View style={styles.incExcCol}>
            <Text style={styles.incExcTitle}>Inclusions</Text>
            {packageData.inclusions && packageData.inclusions.map((inc, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.incExcBulletPlus}>+</Text>
                <Text style={styles.listText}>{inc}</Text>
              </View>
            ))}
          </View>

          <View style={styles.incExcCol}>
            <Text style={styles.incExcTitle}>Exclusions</Text>
            {packageData.exclusions && packageData.exclusions.map((exc, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.incExcBulletMinus}>-</Text>
                <Text style={styles.listText}>{exc}</Text>
              </View>
            ))}
          </View>

        </View>

        {/* Universal Footer */}
        <Text style={styles.footer} render={({ pageNumber }) => (
          `info@divineviewtours.com    |    +91 6026504087    |    Page ${pageNumber}`
        )} fixed />

      </Page>
    </Document>
  );
};
