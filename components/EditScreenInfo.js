import React from 'react';
import { StyleSheet } from 'react-native';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import Colors from '../constants/Colors';
export default function EditScreenInfo({ path }) {
    return (React.createElement(View, null,
        React.createElement(View, { style: styles.getStartedContainer },
            React.createElement(Text, { style: styles.getStartedText, lightColor: "rgba(0,0,0,0.8)", darkColor: "rgba(255,255,255,0.8)" }, "Open up the code for this screen:"),
            React.createElement(View, { style: [styles.codeHighlightContainer, styles.homeScreenFilename], darkColor: "rgba(255,255,255,0.05)", lightColor: "rgba(0,0,0,0.05)" },
                React.createElement(MonoText, null, path)),
            React.createElement(Text, { style: styles.getStartedText, lightColor: "rgba(0,0,0,0.8)", darkColor: "rgba(255,255,255,0.8)" }, "Change any of the text, save the file, and your app will automatically update.")),
        React.createElement(View, { style: styles.helpContainer },
            React.createElement(ExternalLink, { style: styles.helpLink, href: "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet" },
                React.createElement(Text, { style: styles.helpLinkText, lightColor: Colors.light.tint }, "Tap here if your app doesn't automatically update after making changes")))));
}
const styles = StyleSheet.create({
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
});
//# sourceMappingURL=EditScreenInfo.js.map