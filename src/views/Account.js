/* eslint-disable global-require */
import {
  View, Text, Dimensions, StyleSheet, Pressable, Image,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';

const StatusBarHeight = getStatusBarHeight();
const miso = require('../../assets/miso.jpg');

const styles = StyleSheet.create({
  profileBorder: {
    backgroundColor: 'white',
    height: 220,
    width: 220,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    marginBottom: 20,
  },
  profileImage: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
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
          <View style={styles.profileBorder}>
            <Image
              style={styles.profileImage}
              source={miso}
            />
          </View>
        </DropShadow>
      </View>
      <DropShadow style={styles.shadowProp}>
        <View style={[styles.menuItem, { marginBottom: 50, justifyContent: 'center', backgroundColor: '#e0777d' }]}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[styles.menuText, { width: 'auto', fontSize: 32, color: 'white' }]}
          >
            UserName
          </Text>

        </View>

      </DropShadow>
      <DropShadow style={styles.shadowProp}>
        <Pressable style={styles.menuItem}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.menuText}
          >
            Edit Profile
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
            Edit Pets
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
            Sign out
          </Text>

        </Pressable>

      </DropShadow>
    </View>
  );
}
