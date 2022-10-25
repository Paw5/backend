/* eslint-disable global-require */
import {
  Pressable, View, Image, Text, Dimensions, ScrollView, StyleSheet,
} from 'react-native';
import React from 'react';
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
