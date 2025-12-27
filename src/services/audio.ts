import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const failureSound = new Sound('failure.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

const playFailureSound = () => {

};

export default {
  playFailureSound,
};
