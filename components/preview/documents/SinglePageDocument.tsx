import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path } from '@react-pdf/renderer';
import { HiMiniPhone } from 'react-icons/hi2';

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
            padding: 25,
            flexDirection: 'column',
            fontFamily,
        },
        text: {
            fontSize: 11,
            lineHeight: 1.5,
        },
        textMuted: {
            color: "#555555"
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
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 13,
            marginBottom: 12
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View wrap={false}>
                    <View>
                        <Text style={{ fontSize: 32, fontWeight: "bold", textTransform: "uppercase", lineHeight: 1, marginBottom: 10, color }}>John Doe</Text>
                        <Text style={[styles.text, { textTransform: "uppercase", fontWeight: "bold", letterSpacing: 1, marginBottom: 10 }]}>Frontend Developer</Text>
                    </View>
                    <View style={{ paddingTop: 10, paddingBottom: 15, display: "flex", flexDirection: "row", gap: 30, borderBottom: "1px solid #ddd" }}>
                        <View style={{ display: "flex", flexDirection: 'column', gap: 5 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                <Svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <Path
                                        fill="currentColor"
                                        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                                    />
                                </Svg>
                                <Text style={styles.text}>+915698541238</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                <Svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <Path
                                        fill="currentColor"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8s8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47c.65.89 1.77 1.47 2.96 1.47c1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10m0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3"
                                    />
                                </Svg>

                                <Text style={styles.text}>johndoe@yopmail.com</Text>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: 'column', gap: 5 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                <Svg
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <Path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M12 2C6.475 2 2 6.475 2 12a9.99 9.99 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"
                                    />
                                </Svg>
                                <Text style={styles.text}>https://github.com/jd/123</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                <Svg
                                    viewBox="0 0 12 12"
                                    width="13"
                                    height="13"
                                >
                                    <Path
                                        fill="currentColor"
                                        d="M10.8 0A1.2 1.2 0 0 1 12 1.2v9.6a1.2 1.2 0 0 1-1.2 1.2H1.2A1.2 1.2 0 0 1 0 10.8V1.2A1.2 1.2 0 0 1 1.2 0zM8.09 4.356a1.87 1.87 0 0 0-1.598.792l-.085.133h-.024v-.783H4.676v5.727h1.778V7.392c0-.747.142-1.47 1.068-1.47c.913 0 .925.854.925 1.518v2.785h1.778V7.084l-.005-.325c-.05-1.38-.456-2.403-2.13-2.403m-4.531.142h-1.78v5.727h1.78zm-.89-2.846a1.032 1.032 0 1 0 0 2.064a1.032 1.032 0 0 0 0-2.064"
                                    />
                                </Svg>
                                <Text style={styles.text}>https://linkedin.com/johndoe/profile</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 15, paddingBottom: 15, borderBottom: "1px solid #ddd" }}>
                        <View>
                            <Text style={styles.title}>Skills</Text>
                            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <View>
                                    <Text style={[styles.text]}>Languages:</Text>
                                    <Text style={[styles.text, styles.bold]}>Html, Css, Javascript</Text>
                                </View>
                                <View>
                                    <Text style={[styles.text]}>Technologies & Tools:</Text>
                                    <Text style={[styles.text, styles.bold]}>React Js, Next Js, Firebase, Tailwind, Bootstrap, Adobe Photoshop, Adobe Illustrator, Figma, Git, Sass</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", height: 550 }}>
                        <View style={{ paddingRight: 15, paddingTop: 15, width: 180, display: "flex", gap: 30 }}>
                            <View>
                                <Text style={styles.title}>Education</Text>
                                <View>
                                    <Text style={[styles.text, styles.bold]}>Bachelor of Physics</Text>
                                    <Text style={styles.text}>Mahatma Gandhi University</Text>
                                    <Text style={[styles.text, { fontSize: 10 }]}>Kerala</Text>
                                    <Text style={[styles.text, { fontSize: 10 }]}>Jul 2009 - Apr 2012</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Certification</Text>
                                <View>
                                    <Text style={[styles.text, styles.bold]}>Web Graphics Pro</Text>
                                    <Text style={styles.text}>Faith Infotech</Text>
                                    <Text style={[styles.text, { fontSize: 10 }]}>Kerala</Text>
                                    <Text style={[styles.text, { fontSize: 10 }]}>Jul 2009 - Apr 2012</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Recent Projects</Text>
                                <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <View style={{ borderBottom: '1px dashed #ccc', paddingBottom: 10 }}>
                                        <Text style={[styles.text, styles.bold]}>Resumee (2024)</Text>
                                        <Text style={[styles.text, styles.textMuted, { textAlign: 'justify', fontSize: 10 }]}>Online resume builder app. built with react js, next js, firebase, tailwind</Text>
                                    </View>
                                    <View style={{ borderBottom: '1px dashed #ccc', paddingBottom: 10 }}>
                                        <Text style={[styles.text, styles.bold]}>Resumee (2024)</Text>
                                        <Text style={[styles.text, styles.textMuted, { textAlign: 'justify', fontSize: 10 }]}>Online resume builder app. built with react js, next js, firebase, tailwind</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderLeft: "1px solid #ddd", paddingLeft: 15, paddingTop: 15, width: 350 }}>
                            <View>
                                <Text style={styles.title}>Work Experience</Text>
                            </View>
                            <View style={{ display: "flex", gap: 20 }}>
                                <View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <View>
                                            <Text style={[styles.text, styles.bold]}>Microsoft, Kochi</Text>
                                            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'baseline' }}>
                                                <Text style={[styles.text, { paddingRight: 5, lineHeight: 1, fontWeight: 'bold' }]}>UI Developer</Text>
                                                <Text style={[styles.text, { fontSize: 10, borderLeft: '1px solid #666', paddingLeft: 5, lineHeight: 1 }]}>Apr 2014 - Apr 2015</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <View>
                                            <Text style={[styles.text, styles.bold]}>Microsoft, Kochi</Text>
                                            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'baseline' }}>
                                                <Text style={[styles.text, { paddingRight: 5, lineHeight: 1, fontWeight: 'bold' }]}>UI Developer</Text>
                                                <Text style={[styles.text, { fontSize: 10, borderLeft: '1px solid #666', paddingLeft: 5, lineHeight: 1 }]}>Apr 2014 - Apr 2015</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <View>
                                            <Text style={[styles.text, styles.bold]}>Microsoft, Kochi</Text>
                                            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'baseline' }}>
                                                <Text style={[styles.text, { paddingRight: 5, lineHeight: 1, fontWeight: 'bold' }]}>UI Developer</Text>
                                                <Text style={[styles.text, { fontSize: 10, borderLeft: '1px solid #666', paddingLeft: 5, lineHeight: 1 }]}>Apr 2014 - Apr 2015</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[styles.disc, styles.textMuted]}>•</Text>
                                            <Text style={[styles.text, styles.textMuted]}>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</Text>
                                        </View>
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