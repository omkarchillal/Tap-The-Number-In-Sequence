import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
    },
    backButton: {
        width: 50,
        height: 50,
    },
    backButtonImage: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        marginTop: -40,
        alignItems: 'center',
    },
    settingsTile: {
        width: width * 1,
        height: 300,
        transform: [{ rotate: '3deg' }],
    },
    controlsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    volumeControl: {
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: 24,
        color: '#a49f9eff',
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'serif',
    },
    sliderContainer: {
        width: 300,
        height: 50,
        justifyContent: 'center',
    },
    trackImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    fillContainer: {
        height: '100%',
        position: 'absolute',
        left: 0,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    fillImage: {
        width: 300,
        height: '100%',
    },
    knobContainer: {
        position: 'absolute',

    },
    knobImage: {
        width: 70,
        height: 70,
    },
});
