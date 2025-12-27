import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.85;

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: MODAL_WIDTH,

        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '3deg' }],
    },
    backgroundImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.2,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '18%',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
        gap: 20
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center',
        maxWidth: 120,
    },
    buttonImage: {
        width: '100%',
        height: 50,
        transform: [{ rotate: '-3deg' }],

    },
});
