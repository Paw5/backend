import {
  Text, Pressable, View,
} from 'react-native';
import React from 'react';
import styles, { pawPink } from '../constants/Styles';

export default function PetCard() {
  return (

    <Pressable style={styles.healthContainer}>
      <Text style={styles.healthHeader}>Health Component</Text>
      <View
        style={{
          borderBottomColor: pawPink,
          borderBottomWidth: 3,
          borderRadius: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      />
    </Pressable>
  );
}
