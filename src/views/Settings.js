/* eslint-disable global-require */
import {
  View, Text, Dimensions, StyleSheet, Switch, Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';

const StatusBarHeight = getStatusBarHeight();

const styles = StyleSheet.create({
  settingsIcon: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 60,
    marginTop: 20,
  },
  menuItem: {
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 20,
  },
  shadowProp: {
    shadowColor: '#333333',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  menuText: {
    fontSize: 24,
    width: (Dimensions.get('window').width - 120),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'QuicksandBold',
    color: '#333333',
    flexBasis: 'auto',
  },
  lightdark: {
    flexBasis: 'auto',
  },
});

export default function ServicesTab() {
  const [LDisEnabled, LSsetIsEnabled] = useState(false);
  const [LCisEnabled, LCsetIsEnabled] = useState(false);
  const lightdarkSwitch = () => LSsetIsEnabled((previousState) => !previousState);
  const locationSwitch = () => LCsetIsEnabled((previousState) => !previousState);

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

      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight, marginBottom: 30 }} />
      <View>
        <DropShadow style={styles.shadowProp}>
          <Feather
            name="settings"
            size={100}
            color="#333333"
            style={styles.settingsIcon}
          />
        </DropShadow>
      </View>
      <DropShadow style={styles.shadowProp}>
        <View style={styles.menuItem}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.menuText}
          >
            Dark/Light Mode
          </Text>
          <Switch
            style={styles.lightdark}
            trackColor={{ false: '#e0777d', true: '#edae49' }}
            thumbColor="white"
            ios_backgroundColor="#e0777d"
            onValueChange={lightdarkSwitch}
            value={LDisEnabled}
          />
        </View>

      </DropShadow>
      <DropShadow style={styles.shadowProp}>
        <View style={styles.menuItem}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.menuText}
          >
            Disable Location Services
          </Text>
          <Switch
            style={styles.lightdark}
            trackColor={{ false: '#e0777d', true: '#333333' }}
            thumbColor="white"
            ios_backgroundColor="#e0777d"
            onValueChange={locationSwitch}
            value={LCisEnabled}
          />
        </View>

      </DropShadow>
      <DropShadow style={styles.shadowProp}>
        <Pressable style={styles.menuItem}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.menuText}
          >
            Notifications
          </Text>
          <Feather
            name="chevron-right"
            size={30}
            color="#333333"
            style={{ marginRight: -5 }}
          />

        </Pressable>

      </DropShadow>
      <DropShadow style={styles.shadowProp}>
        <Pressable style={styles.menuItem}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.menuText}
          >
            Help
          </Text>
          <Feather
            name="chevron-right"
            size={30}
            color="#333333"
            style={{ marginRight: -5 }}
          />

        </Pressable>

      </DropShadow>
    </View>
  );
}
