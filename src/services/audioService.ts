import Sound from 'react-native-sound';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_MUSIC_VOLUME = 'settings_music_volume';
const KEY_SOUND_VOLUME = 'settings_sound_volume';

Sound.setCategory('Playback');

class SoundManager {
    private sounds: { [key: string]: Sound | null } = {};
    private isBackgroundMusicPlaying: boolean = false;
    private shouldPlayBackgroundMusic: boolean = false;
    private isBackgroundMusicLoaded: boolean = false;
    private musicVolume: number = 1.0;
    private soundVolume: number = 1.0;

    constructor() {
        this.loadSettings();
        this.preloadSounds();
    }

    private async loadSettings() {
        try {
            const musicVol = await AsyncStorage.getItem(KEY_MUSIC_VOLUME);
            const soundVol = await AsyncStorage.getItem(KEY_SOUND_VOLUME);

            if (musicVol !== null) {
                this.musicVolume = parseFloat(musicVol);
            }
            if (soundVol !== null) {
                this.soundVolume = parseFloat(soundVol);
            }

            console.log(`[SoundManager] Settings loaded - Music: ${this.musicVolume}, Sound: ${this.soundVolume}`);

            // Apply loaded volume to ALL sounds immediately
            Object.keys(this.sounds).forEach((key) => {
                const sound = this.sounds[key];
                if (sound) {
                    if (key === 'backgroundMusic') {
                        sound.setVolume(this.musicVolume);
                    } else {
                        sound.setVolume(this.soundVolume);
                    }
                }
            });

        } catch (error) {
            console.error('Failed to load audio settings', error);
        }
    }

    private preloadSounds() {
        const soundFiles = {
            button: require('../assets/sounds/button.mp3'),
            correct: require('../assets/sounds/forCorrectClicks.mp3'),
            incorrect: require('../assets/sounds/incorrectClick.mp3'),
            levelup: require('../assets/sounds/levelUp.mp3'),
            gameStart: require('../assets/sounds/gameStart.mp3'),
            backgroundMusic: require('../assets/sounds/backgroundMusic.mp3'),

        };

        Object.keys(soundFiles).forEach((key) => {
            try {
                const asset = Image.resolveAssetSource(soundFiles[key as keyof typeof soundFiles]);
                console.log(`Loading sound ${key}, URI: ${asset?.uri}`);

                if (asset && typeof asset.uri === 'string') {
                    const sound = new Sound(asset.uri, '', (error) => {
                        if (error) {
                            console.log(`Failed to load sound ${key}`, error);
                            return;
                        }
                        if (key === 'backgroundMusic') {
                            this.isBackgroundMusicLoaded = true;
                            sound.setVolume(this.musicVolume);
                            if (this.shouldPlayBackgroundMusic) {
                                this.playBackgroundMusic();
                            }
                        } else {
                            sound.setVolume(this.soundVolume);
                        }
                    });
                    this.sounds[key] = sound;
                } else {
                    console.log(`Failed to resolve URI for sound ${key}, asset:`, asset);
                }
            } catch (e) {
                console.log(`Failed to init sound ${key}`, e);
            }
        });
    }



    /**
     * Plays a preloaded sound by name.
     * Stops any previous instance of the same sound before playing.
     */
    playSound(soundName: string) {
        const sound = this.sounds[soundName];
        if (sound) {
            if (soundName === 'backgroundMusic') {
                sound.setVolume(this.musicVolume);
            } else {
                sound.setVolume(this.soundVolume);
            }
            sound.stop(() => {
                sound.play((success) => {
                    if (!success) {
                        console.log(`Playback failed for sound ${soundName}`);
                    }
                });
            });
        } else {
            console.log(`Sound ${soundName} not found`);
        }
    }



    /**
     * Starts background music if it's loaded and enabled.
     * Sets it to loop indefinitely.
     */
    playBackgroundMusic() {
        if (this.isBackgroundMusicPlaying) return;

        this.shouldPlayBackgroundMusic = true;

        if (!this.isBackgroundMusicLoaded) {
            console.log('Background music not loaded yet, queued for playback');
            return;
        }

        const sound = this.sounds['backgroundMusic'];
        if (sound) {
            this.isBackgroundMusicPlaying = true;
            sound.setNumberOfLoops(-1);
            sound.play((success) => {
                if (!success) {
                    console.log('Playback failed for background music');
                    this.isBackgroundMusicPlaying = false;
                }
            });
        }
    }



    /**
     * Stops background music and resets the playing state.
     */
    stopBackgroundMusic() {
        this.shouldPlayBackgroundMusic = false;
        const sound = this.sounds['backgroundMusic'];
        if (sound && this.isBackgroundMusicPlaying) {
            sound.stop();
            this.isBackgroundMusicPlaying = false;
        }
    }



    /**
     * Pauses background music (e.g., when app goes to background).
     */
    pauseBackgroundMusic() {

        const sound = this.sounds['backgroundMusic'];
        if (sound && this.isBackgroundMusicPlaying) {
            sound.pause();
            this.isBackgroundMusicPlaying = false;
        }
    }



    /**
     * Resumes background music if it was previously playing/enabled.
     */
    resumeBackgroundMusic() {

        if (this.shouldPlayBackgroundMusic && !this.isBackgroundMusicPlaying) {
            this.playBackgroundMusic();
        }
    }

    setMusicVolume(volume: number) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        AsyncStorage.setItem(KEY_MUSIC_VOLUME, this.musicVolume.toString()).catch(e => console.error('Failed to save music volume', e));

        const sound = this.sounds['backgroundMusic'];
        if (sound) {
            sound.setVolume(this.musicVolume);
        }
    }

    setSoundVolume(volume: number) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
        AsyncStorage.setItem(KEY_SOUND_VOLUME, this.soundVolume.toString()).catch(e => console.error('Failed to save sound volume', e));

        Object.keys(this.sounds).forEach(key => {
            if (key !== 'backgroundMusic') {
                const sound = this.sounds[key];
                if (sound) {
                    sound.setVolume(this.soundVolume);
                }
            }
        });
    }

    getMusicVolume(): number {
        return this.musicVolume;
    }

    getSoundVolume(): number {
        return this.soundVolume;
    }
}

export const soundManager = new SoundManager();
