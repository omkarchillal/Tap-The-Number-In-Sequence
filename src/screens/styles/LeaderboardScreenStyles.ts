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
    title: {
        fontSize: metrics.rf(32),
        color: '#FFFFFF',
        fontWeight: '900',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    loader: {
        flex: 1,
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
    listWrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: metrics.rw(5),
    },
    list: {
        paddingVertical: metrics.rh(2),
        paddingBottom: metrics.rh(12),
    },
    rowWrapper: {
        marginBottom: metrics.rh(1),
        height: metrics.rh(8),
    },
    rowBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: metrics.rw(5),
        width: '100%',
    },
    rankBadge: {
        width: metrics.rw(10),
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight: metrics.rw(1),
    },
    rankText: {
        color: '#5D4037',
        fontWeight: 'bold',
        fontSize: metrics.rf(16),
    },
    name: {
        color: '#3E2723',
        fontSize: metrics.rf(18),
        fontWeight: 'bold',
        flex: 1,
        marginRight: metrics.rw(2),
    },
    score: {
        color: '#D84315',
        fontSize: metrics.rf(18),
        fontWeight: '900',
        minWidth: metrics.rw(12),
        textAlign: 'right',
    },
    emptyText: {
        color: '#5D4037',
        textAlign: 'center',
        marginTop: metrics.rh(5),
        fontSize: metrics.rf(18),
    },
    footer: {
        position: 'absolute',
        bottom: metrics.rh(2),
        width: '100%',
        alignItems: 'center',
        paddingVertical: metrics.rh(2),
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
