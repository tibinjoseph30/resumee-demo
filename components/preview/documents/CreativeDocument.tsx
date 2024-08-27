import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  text: { fontSize: 12 },
});

const CreativeDocument = ({ font, color }: { font: string; color: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>This is the Creative Layout</Text>
        {/* Add other sections and components here */}
      </View>
    </Page>
  </Document>
);

export default CreativeDocument;