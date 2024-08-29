import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link, Note } from '@react-pdf/renderer';

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

const StandardDocument = ({ font, color }: { font: string; color: string }) => {
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
            color,
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
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={[styles.text, { fontSize: 24, fontWeight: 500, textAlign: 'center' }]}>John Doe</Text>
                </View>
                <View style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.text}>Frontend Developer</Text>
                    <Text style={styles.text}>7569856321{' '}|{' '}jd@yopmail.com</Text>
                    <Text style={styles.text}>
                        <Link src="https://github.com/johndoe1">github.com/johndoe1</Link>{' '}|{' '}
                        <Link src="https://linkedin.com/in/johndoe">linkedin.com/in/johndoe</Link>
                    </Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ borderBottom: '1px solid #555' }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Skills</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.text}>Languages: </Text>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>C/C++, Java, Python, JavaScript, TypeScript, SQL</Text>
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.text}>Technologies & Tools: </Text>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>AWS, EC2, DynamoDB, S3, SQS, Lambda, Athena, Elasticsearch, Spark, Hive, Presto, Docker, Splunk, Kafka, Spring, Angular, ReactJS</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ borderBottom: '1px solid #555' }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Work Experience</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Adobe, Bangalore</Text>
                            <Text style={styles.text}>Mar 2021 - Present</Text>
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={[styles.text, { fontStyle: 'italic', fontWeight: 500, marginBottom: 5 }]}>Comuter Scientist</Text>
                            <View style={{ paddingLeft: 15, paddingRight: 12 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.disc}>•</Text>
                                    <Text style={styles.text}>Led the migration of Hive and Presto jobs from Qubole to AWS EMR, enhancing availability and significantly reducing operational costs.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.disc}>•</Text>
                                    <Text style={styles.text}>Reduced the cost involved in running custom reports service by more than 80% by devising an automated system that identified and disabled reports with no usage or empty data</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Amazone, Bangalore</Text>
                            <Text style={styles.text}>Sep 2019 - Mar 2021</Text>
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={[styles.text, { fontStyle: 'italic', fontWeight: 500, marginBottom: 5 }]}>Software Development Engineer</Text>
                            <View style={{ paddingLeft: 15, paddingRight: 12 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.disc}>•</Text>
                                    <Text style={styles.text}>Led the migration of Hive and Presto jobs from Qubole to AWS EMR, enhancing availability and significantly reducing operational costs.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.disc}>•</Text>
                                    <Text style={styles.text}>Reduced the cost involved in running custom reports service by more than 80% by devising an automated system that identified and disabled reports with no usage or empty data</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.disc}>•</Text>
                                    <Text style={styles.text}>Led a cost-saving initiative by identifying unused AWS resources and establishing S3 bucket expiration policies, leading to an annual cost reduction exceeding $50,000 in AWS expenditures.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ borderBottom: '1px solid #555' }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Education</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>BITS Hyderabad</Text>
                            <Text style={styles.text}>Sep 2019 - Mar 2021</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text style={styles.text}>B.E. in Computer Science and Engineering</Text>
                            <Text style={[styles.text, { fontWeight: 600 }]}>CGPA: 7.96/10</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.text}>Relevant Coursework: Object Oriented Programming, Databases, Discrete Maths, Data Structures and Algorithms, Operating Systems, Computer Networks, Machine Learning, Data Mining, Advance Data Structures and Algorithms, Information Retrieval, Image Processing</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ borderBottom: '1px solid #555' }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>Projects</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <View>
                                <Text style={[styles.text, { fontWeight: 'bold' }]}>Word Lookup Dictionary (2015):</Text>
                                <Text style={styles.text}>Developed a desktop software for online lookup of English words. Implemented efficient search of valid words using Trie data structure. Implemented spelling correction and auto-suggestion using edit distance algorithm. Used web scraping to get the data for online lookup. Python, BeautifulSoup.</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <View>
                                <Text style={[styles.text, { fontWeight: 'bold' }]}>Alternative-Routes in Road Networks (2016):</Text>
                                <Text style={styles.text}>the route which takes the shortest time to travel from source to destination in a given road network with randomly generated traffic. Implemented methods to avoid collisions between vehicles by dynamically changing their speeds. Used C++ and OpenGL library for simulation. C++, OpenGL</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default StandardDocument;