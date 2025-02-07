import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Bitter Serif',
    fonts: [
        { src: '/fonts/Bitter-serif/Bitter-Regular.ttf' },
        { src: '/fonts/Bitter-serif/Bitter-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Bitter-serif/Bitter-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Bitter-serif/Bitter-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Bitter-serif/Bitter-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Bitter-serif/Bitter-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Bitter-serif/Bitter-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
    ],
});

Font.register({
    family: 'Inter',
    fonts: [
        { src: '/fonts/Inter/Inter-Regular.ttf' },
        { src: '/fonts/Inter/Inter-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Inter/Inter-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Inter/Inter-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Inter/Inter-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Inter/Inter-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto/Roboto-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Roboto/Roboto-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Poppins',
    fonts: [
        { src: '/fonts/Poppins/Poppins-Regular.ttf' },
        { src: '/fonts/Poppins/Poppins-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Poppins/Poppins-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Poppins/Poppins-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Poppins/Poppins-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Poppins/Poppins-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: '/fonts/Open-sans/OpenSans-Regular.ttf' },
        { src: '/fonts/Open-sans/OpenSans-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Open-sans/OpenSans-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Open-sans/OpenSans-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Open-sans/OpenSans-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Open-sans/OpenSans-Bold.ttf', fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Cousine',
    fonts: [
        { src: '/fonts/Cousine/Cousine-Regular.ttf' },
        { src: '/fonts/Cousine/Cousine-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Cousine/Cousine-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
    ],
});

Font.register({
    family: 'Noto Serif',
    fonts: [
        { src: '/fonts/Noto-serif/NotoSerif-Regular.ttf' },
        { src: '/fonts/Noto-serif/NotoSerif-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Noto-serif/NotoSerif-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
        { src: '/fonts/Noto-serif/NotoSerif-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Noto-serif/NotoSerif-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
        { src: '/fonts/Noto-serif/NotoSerif-Bold.ttf', fontWeight: 'bold' },
        { src: '/fonts/Noto-serif/NotoSerif-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
    ],
});

const SinglePageDocument = ({ font, color }: { font: string; color: string }) => {

    const fontFamily = font === 'inter' ? 'Inter' :
        font === 'bitterSerif' ? 'Bitter Serif' :
            font === 'openSans' ? 'Open Sans' :
                font === 'notoSerif' ? 'Noto Serif' :
                    font === 'poppins' ? 'Poppins' :
                        font === 'cousine' ? 'Cousine' :
                            font === 'roboto' ? 'Roboto' : 'Inter';

    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontFamily,
        },
        text: {
            fontSize: 11,
            lineHeight: 1.5,
        },
        bold: {
            fontWeight: 'bold',
        },
        normal: {
            fontWeight: 'normal',
        },
        disc: {
            fontSize: 12,
            marginRight: 8
        },
        title: {
            color: '#999',
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 11,
            marginBottom: 12,
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={{ fontSize: 28, fontWeight: "bold", textTransform: "uppercase", lineHeight: 1.3, color }}>John Doe</Text>
                    <Text style={[styles.text, { textTransform: "uppercase", letterSpacing: 4, marginBottom: 10 }]}>Frontend Developer</Text>
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #ddd" }}>
                    <View>
                        <Text style={styles.text}>Mob: +915698541238</Text>
                        <Text style={styles.text}>Email: johndoe@yopmail.com</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>https://github.com/jd/123</Text>
                        <Text style={styles.text}>https://linkedin.com/johndoe/profile</Text>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", height: 660 }}>
                    <View style={{ paddingRight: 15, paddingTop: 15, width: 180, display: "flex", gap: 30 }}>
                        <View>
                            <Text style={styles.title}>Skills</Text>
                            <View style={{ display: "flex", gap: 10 }}>
                                <View>
                                    <Text style={styles.text}>Languages:</Text>
                                    <Text style={[styles.text, styles.bold]}>HTML, CSS, Javascript</Text>
                                </View>
                                <View>
                                    <Text style={styles.text}>Technologies & Tools:</Text>
                                    <Text style={[styles.text, styles.bold]}>React Js, Next Js, Firebase, Tailwind, Bootstrap, Adobe Photoshop, Adobe Illustrator, Figma, Git, Sass</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Education</Text>
                            <View>
                                <Text style={[styles.text, styles.bold]}>Bachelor of Physics</Text>
                                <Text style={styles.text}>Mahatma Gandhi University</Text>
                                <Text style={styles.text}>Kerala</Text>
                                <Text style={[styles.text, { fontSize: 10 }]}>Jul 2009 - Apr 2012</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Certification</Text>
                            <View>
                                <Text style={[styles.text, styles.bold]}>Web Graphics Pro</Text>
                                <Text style={styles.text}>Faith Infotech</Text>
                                <Text style={styles.text}>Kerala</Text>
                                <Text style={[styles.text, { fontSize: 10 }]}>Jul 2009 - Apr 2012</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderLeft: "1px solid #ddd", paddingLeft: 15, paddingTop: 15, width: 350 }}>
                        <View>
                            <Text style={styles.title}>Work Experience</Text>
                        </View>
                        <View style={{ display: "flex", gap: 20 }}>
                            <View>
                                <View style={{ display: "flex", gap: 7, flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <View>
                                        <Text style={[styles.text, styles.bold]}>Microsoft, Kochi</Text>
                                        <Text style={styles.text}>UI Developer</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { fontSize: 10 }]}>Apr 2014 - Apr 2015</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.disc}>•</Text>
                                        <Text style={styles.text}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.disc}>•</Text>
                                        <Text style={styles.text}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{ display: "flex", gap: 7, flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <View>
                                        <Text style={[styles.text, styles.bold]}>Microsoft, Kochi</Text>
                                        <Text style={styles.text}>UI Developer</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.text, { fontSize: 10 }]}>Apr 2014 - Apr 2015</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.disc}>•</Text>
                                        <Text style={styles.text}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.disc}>•</Text>
                                        <Text style={styles.text}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default SinglePageDocument;