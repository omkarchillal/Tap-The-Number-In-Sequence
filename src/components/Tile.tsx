import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, ImageBackground, StyleProp, ViewStyle, Vibration } from 'react-native';
import metrics from '../config/metrics';
import { styles } from './styles/TileStyles';
import { CLOUDINARY_URLS } from '../config/cloudinary';


interface Props {
  id: string;
  number: number;
  color: string;
  onPress: (id: string) => void;
  isEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Tile: React.FC<Props> = ({ id, number, color, onPress, isEnabled = true, style }) => {
  const [isTouched, setIsTouched] = useState(false);

  const depth = metrics.TILE_SHADOW_DEPTH;
  const borderRadius = metrics.TILE_BORDER_RADIUS;

  const handlePressIn = () => {
    if (!isEnabled) return;
    Vibration.vibrate(50);
    LayoutAnimation.spring();
    setIsTouched(true);
    onPress(id);
  };

  const handlePressOut = () => {
    if (!isEnabled) return;

    setIsTouched(false);
  };

  const halfDepth = depth / 2;



  const tileStyle = {
    transform: [{ translateY: isTouched ? depth : 0 }],
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={style}>
        <View style={[styles.tileContainer, tileStyle]}>
          <ImageBackground
            source={{ uri: CLOUDINARY_URLS.blankStone }}
            style={styles.tileImage}
            resizeMode="contain"
          >
            <Text style={styles.text}>{number}</Text>
          </ImageBackground>
        </View>
        {/* Removed separate depth view as stone likely has 3D effect or it looks weird with code-generated shadow + image. 
                  If stone is flat, we might keep depth. Assuming stone.png is the whole tile visual. 
                  Keeping depth for now but making it subtle or checking if it fits? 
                  Actually, if using an image, code-based shadow often clashes. 
                  Let's try removing the explicit "depth" view separate block and rely on the image or simple shadow.
                  BUT, the game logic relies on "pressing" animation.
                  Let's keep the translation logic but simplify the visual structure.
               */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tile;
