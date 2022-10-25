/* eslint-disable global-require */
import {
  Pressable, View, Image, Text, Dimensions, ScrollView, StyleSheet,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';
import styles from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();

const miso = require('../../assets/miso.jpg');

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
      flex: 1, backgroundColor: '#69A297',
    }}
    >

      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight }} />

      <ScrollView contentInset={{ bottom: 150 }} style={{ marginTop: 20 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={180}
          contentOffset={{ x: -110 }}
          decelerationRate="fast"
          disableIntervalMomentum
          directionalLockEnabled
          pagingEnabled
          contentInset={{ left: 100, right: 100 }}
          style={{
            width: Dimensions.get('window').width, paddingBottom: 60,
          }}
        >

          <DropShadow style={styles.shadowProp}>
            <Pressable style={styles.petCard}>
              <Image
                style={styles.petImage}
                source={miso}
              />
              <Text style={styles.petHeader}>Miso</Text>

            </Pressable>
          </DropShadow>
          <DropShadow style={styles.shadowProp}>
            <Pressable style={styles.petCard}>
              <Image
                style={styles.petImage}
                source={miso}
              />
              <Text style={styles.petHeader}>Miso</Text>

            </Pressable>
          </DropShadow>
          <DropShadow style={styles.shadowProp}>
            <Pressable style={styles.petCard}>
              <Image
                style={styles.petImage}
                source={miso}
              />
              <Text style={styles.petHeader}>Miso</Text>

            </Pressable>
          </DropShadow>
          <DropShadow style={styles.shadowProp}>
            <Pressable style={styles.petCard}>
              <Image
                style={styles.petImage}
                source={miso}
              />
              <Text style={styles.petHeader}>Miso</Text>

            </Pressable>
          </DropShadow>
        </ScrollView>

        <DropShadow style={styles.shadowProp}>
          <Pressable style={[styles.healthContainer, { height: 200 }]}>
            <Text style={styles.healthHeader}>Upcoming Appointments</Text>
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
        <DropShadow style={styles.shadowProp}>
          <Pressable style={[styles.healthContainer, { height: 150 }]}>
            <Text style={styles.healthHeader}>Did you feed the dog today?</Text>
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
        <DropShadow style={styles.shadowProp}>
          <Pressable style={[styles.healthContainer, { height: 300 }]}>
            <Text style={styles.healthHeader}>Walk Tracker</Text>
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

      </ScrollView>
    </View>
  );
}
