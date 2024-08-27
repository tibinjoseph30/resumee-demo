import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register custom fonts
// Font.register({
//     family: 'Merriweather',
//     src: '../../../public/fonts/Merriweather-Regular.ttf',
// });

const SinglePageDocument = ({ font, color }: { font: string; color: string }) => {
    // const fontFamily = font === 'inter' ? 'Inter' :
    //     font === 'merriweather' ? 'Merriweather' :
    //         font === 'ebGaramond' ? 'EB Garamond' :
    //             font === 'lato' ? 'Lato' :
    //                 font === 'roboto' ? 'Roboto' : 'Arial';

    const styles = StyleSheet.create({
        page: { padding: 30 },
        section: { margin: 10, padding: 10, flexGrow: 1 },
        text: { fontSize: 12, color },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>This is the SinglePage Layout</Text>
                    {/* Add other sections and components here */}
                </View>
            </Page>
        </Document>
    );
};

export default SinglePageDocument;