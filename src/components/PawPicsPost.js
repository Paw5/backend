/* eslint-disable no-unused-vars */
import {
  View, Text, ScrollView, Pressable, Image,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';
import SearchBar from './SearchBarServ';
import styles from '../constants/Styles';

const miso = require('../../assets/miso.jpg');

const StatusBarHeight = getStatusBarHeight();

export default function PawPicsPost() {
  return (
    <View>
      <DropShadow style={styles.shadowProp}>
        <Pressable style={[styles.picContainer, { height: 400 }]}>
          <Image
            style={styles.picImage}
            source={miso}
          />

          <Pressable style={styles.ppProfileNameNode}>
            <Text style={styles.picHeader2}>@user-name</Text>
          </Pressable>
          <Image
            style={styles.ppProfileImage}
            source={miso}
          />
        </Pressable>

      </DropShadow>
    </View>
  );
}
