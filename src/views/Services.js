/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import {
  View, Text, ScrollView, Dimensions,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Styles from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();

export default function ServicesTab() {
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
      flex: 1, backgroundColor: '#69A297',
    }}
    >

      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight }} />
      <ScrollView contentInset={{ bottom: 50 }} style={{ marginTop: 20 }}>
        <Text style={Styles.healthHeader}>Services</Text>
      </ScrollView>
    </View>
  );
}
