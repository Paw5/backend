/* eslint-disable global-require */
import {
  View, Text, Dimensions, StyleSheet, Pressable,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';

const StatusBarHeight = getStatusBarHeight();

const styles = StyleSheet.create({
  menuItem: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    height: 50,
  },
  shadowProp: {
    shadowColor: '#333333',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  menuText: {
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
      <DropShadow style={styles.shadowProp}>
        <Pressable style={styles.menuItem}>
          <Text style={styles.menuText}>Accessibility Features</Text>
          <View
            style={{
              borderBottomColor: '#e0777d',
              borderBottomWidth: 3,
              borderRadius: 50,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
        </Pressable>

      </DropShadow>
    </View>
  );
}
