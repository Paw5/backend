/* eslint-disable global-require */
import {
  Pressable, View, Image, Text, Dimensions, ScrollView, StyleSheet,
} from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
// import Constants from 'expo-constants';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';

const StatusBarHeight = getStatusBarHeight();

const miso = require('../../assets/miso.jpg');

const styles = StyleSheet.create({
  petCard: {
    height: 200,
    width: 160,
    backgroundColor: 'white',
    color: '#333333',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    marginTop: 0,
    marginBottom: -30,
    borderRadius: 25,
  },

  shadowProp: {
    shadowColor: '#333333',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

  petHeader: {
    fontSize: 32,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: '#333333',
  },

  petImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#e0777d',
  },

  healthContainer: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },

  healthHeader: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
    fontFamily: 'QuicksandBold',
    color: '#333333',
  },
});

export default function HealthTab() {
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
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#69A297', paddingTop: Constants.statusBarHeight,
    }}
    >
      <Text>Hello Grae</Text>
    </View>
  );
}
