import {
  Text, Pressable, View,
} from 'react-native';
import React from 'react';
import styles from '../constants/DarkStyles';

export default function PetCard() {
  return (

    <Pressable style={styles.healthContainer}>
      <Text style={styles.healthHeader}>Health Component</Text>
      <View
        style={styles.healthDivider}
      />
    </Pressable>
  );
}
