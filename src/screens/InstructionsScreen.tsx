import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import metrics from '../config/metrics';
import colors from '../config/colors';
import BounceButton from '../components/BounceButton';

import { styles } from './styles/InstructionsScreenStyles';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';
import { useEffect } from 'react';

interface Props {
    onBack?: () => void;
    embedded?: boolean;
}

const InstructionsScreen: React.FC<Props> = ({ onBack, embedded = false }) => {
    useEffect(() => {
        soundManager.playBackgroundMusic();
    }, []);

    return (
        <View style={styles.container}>
            {!embedded && (
                <View style={styles.header}>
                    <Image source={{ uri: CLOUDINARY_URLS.instructions }} style={styles.titleImage} resizeMode="contain" />
                </View>
            )}
            <View style={styles.tabletContainer}>
                <ImageBackground
                    source={{ uri: CLOUDINARY_URLS.stoneTabletLarge }}
                    style={styles.tabletImage}
                    resizeMode="stretch"
                >
                    <View style={styles.listWrapper}>
                        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                            <Animatable.View animation="fadeInUp" delay={200}>
                                <Text style={styles.text}>
                                    <Text style={styles.bold}>1.</Text> The goal is to tap the numbers in ascending order (STARTING FROM THE LOWEST).
                                </Text>
                                <Text style={styles.text}>
                                    <Text style={styles.bold}>2.</Text> You have time based on the number of tiles to score as many points as possible.
                                </Text>
                                <Text style={styles.text}>
                                    <Text style={styles.bold}>3.</Text> Tapping the correct number gives you points and hides the tile.
                                </Text>
                                <Text style={styles.text}>
                                    <Text style={styles.bold}>4.</Text> Tapping the wrong number results in an immediate GAME OVER!
                                </Text>
                                <Text style={styles.text}>
                                    <Text style={styles.bold}>5.</Text> Clear the board to advance to the next level.
                                </Text>
                            </Animatable.View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
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

export default InstructionsScreen;
