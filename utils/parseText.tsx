import { Text } from "@react-pdf/renderer";

export const parseText = (text: string) => {
    // Remove <p> and </p> tags
    text = text.replace(/<\/?p>/g, '');

    const regex = /(<strong><em>(.*?)<\/em><\/strong>)|(<strong>(.*?)<\/strong>)|(<em>(.*?)<\/em>)/g;

    const elements = [];
    let lastIndex = 0;

    text.replace(regex, (match, boldItalic, biText, bold, bText, italic, iText, offset) => {
        // Push normal text before the match
        if (lastIndex < offset) {
            elements.push(<Text key={lastIndex}>{text.substring(lastIndex, offset)}</Text>);
        }

        // Push formatted text
        if (boldItalic) {
            elements.push(<Text key={offset} style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{biText}</Text>);
        } else if (bold) {
            elements.push(<Text key={offset} style={{ fontWeight: 'bold' }}>{bText}</Text>);
        } else if (italic) {
            elements.push(<Text key={offset} style={{ fontStyle: 'italic' }}>{iText}</Text>);
        }

        lastIndex = offset + match.length;
        return match;
    });

    // Push remaining text
    if (lastIndex < text.length) {
        elements.push(<Text key={lastIndex}>{text.substring(lastIndex)}</Text>);
    }

    return elements;
};