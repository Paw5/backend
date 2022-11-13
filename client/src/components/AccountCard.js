import {
  Text, Pressable, Image, View,
} from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import styles from '../constants/Styles';

const miso = require('../../assets/miso.jpg');

export default function AccountCard() {
  return (

    <View style={styles.transparentBG}>
      <Pressable style={styles.accountCard}>
        <Image
          style={styles.accountImage}
          source={miso}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={styles.accountHeader}
          >
            Miso
          </Text>
          <Pressable>
            <Feather
              name="x-circle"
              size={30}
              color="indianred"
              style={{ alignSelf: 'center', paddingLeft: 10, paddingTop: 10 }}
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}
