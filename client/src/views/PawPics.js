/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import {
  View, ScrollView, Platform,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DropShadow from 'react-native-drop-shadow';
import SearchBar from '../components/SearchBarServ';
import styles, { pawPink, pawGreen } from '../constants/Styles';
import PawPicsPost from '../components/PawPicsPost';

const StatusBarHeight = getStatusBarHeight();

export default function PawPics() {
  const [loaded] = useFonts({
    QuicksandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuicksandLight: require('../../assets/fonts/Quicksand-Light.ttf'),
    QuicksandMedium: require('../../assets/fonts/Quicksand-Medium.ttf'),
    QuicksandRegular: require('../../assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{
      flex: 1, backgroundColor: pawGreen,
    }}
    >
      <View style={{ backgroundColor: pawPink, height: StatusBarHeight }} />
      <View style={styles.search}>
        <SearchBar />
      </View>
      <View style={[styles.containerMap, { backgroundColor: pawGreen }]}>

        <ScrollView
          contentInset={{ bottom: 160 }}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: Platform.OS === 'android' ? 170 : 0 }}
        >
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
        </ScrollView>
      </View>
    </View>
  );
}
