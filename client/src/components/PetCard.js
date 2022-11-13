import {
  Text, Pressable, Image, View,
} from 'react-native';
import React from 'react';
import styles from '../constants/Styles';

const miso = require('../../assets/miso.jpg');

export default function PetCard() {
  return (

    <View style={styles.transparentBG}>
      <Pressable style={styles.petCard}>
        <Image
          style={styles.petImage}
          source={miso}
        />
        <Text style={styles.petHeader}>Miso</Text>

      </Pressable>
    </View>
  );
}
