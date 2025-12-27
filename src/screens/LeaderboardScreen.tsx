import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getLeaderboard } from '../services/userApi';
import colors from '../config/colors';
import BounceButton from '../components/BounceButton';

import { styles } from './styles/LeaderboardScreenStyles';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';

interface Props {
    onBack?: () => void;
    embedded?: boolean;
}

interface LeaderboardItem {
    uid: string;
    displayName: string;
    highScore: number;
    photoURL?: string;
}

const LeaderboardScreen: React.FC<Props> = ({ onBack, embedded = false }) => {
    const [data, setData] = useState<LeaderboardItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const leaderboard = await getLeaderboard();
            setData(leaderboard);
            setLoading(false);
        };

        fetchLeaderboard();
        soundManager.playBackgroundMusic();
    }, []);

    return (
        <View style={styles.container}>
            {!embedded && (
                <View style={styles.header}>
                    <Image source={{ uri: CLOUDINARY_URLS.leaderboard }} style={styles.titleImage} resizeMode="contain" />
                </View>
            )}

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
                <View style={styles.listWrapper}>
                    <FlatList
                        data={data.slice(0, 10)}
                        keyExtractor={item => item.uid}
                        contentContainerStyle={styles.list}
                        renderItem={({ item, index }) => (
                            <View style={styles.rowWrapper}>
                                <ImageBackground
                                    source={{ uri: CLOUDINARY_URLS.nameTile }}
                                    style={styles.rowBackground}
                                    resizeMode="stretch"
                                >
                                    <View style={styles.rowContent}>
                                        <View style={styles.rankBadge}>
                                            <Text style={styles.rankText}>#{index + 1}</Text>
                                        </View>
                                        <Text style={styles.name} numberOfLines={1}>{item.displayName || 'Anonymous'}</Text>
                                        <Text style={styles.score}>{item.highScore}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No scores yet!</Text>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}

            {!embedded && (
                <View style={styles.footer}>
                    <BounceButton onPress={() => { soundManager.playSound('button'); onBack && onBack(); }}>
                        <Image source={{ uri: CLOUDINARY_URLS.back }} style={styles.backButtonImage} resizeMode="contain" />
                    </BounceButton>
                </View>
            )}
        </View>
    );
};

export default LeaderboardScreen;
