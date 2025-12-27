import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: metrics.rh(12),
        marginBottom: metrics.rh(1),
        alignItems: 'center',
    },
    titleImage: {
        width: metrics.rw(75),
        height: metrics.rh(8),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    tabletContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: metrics.rw(2),
    },
    tabletImage: {
        width: '100%',
        height: '90%',
        maxHeight: metrics.rh(75),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    listWrapper: {
        width: '100%',
        height: '100%',
        paddingVertical: metrics.rh(9),
        paddingHorizontal: metrics.rw(12),
    },
    content: {
        flexGrow: 1,
    },
    text: {
        color: '#3E2723',
        fontSize: metrics.rf(18),
        marginBottom: metrics.rh(2),
        lineHeight: metrics.rf(24),
        fontWeight: '500',
    },
    bold: {
        fontWeight: 'bold',
        color: '#D84315',
    },
    footer: {
        paddingVertical: metrics.rh(2),
        alignItems: 'center',
    },
    backButtonImage: {
        width: metrics.rw(35),
        height: metrics.rh(6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    embeddedContainer: {
        paddingTop: metrics.rh(1),
        paddingBottom: metrics.rh(10),
    }
});
