/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import {
  Pressable, View, Image, Text, Dimensions, Animated, ScrollView, Platform,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import styles, { pawPink } from '../constants/Styles';

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

  const scrollX = new Animated.Value(0);

  return (

    <View style={{
      flex: 1, backgroundColor: '#69A297',
    }}
    >

      <View style={{ backgroundColor: pawPink, height: StatusBarHeight }} />

      <ScrollView
        contentInset={{ bottom: 40 }}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: Platform.OS === 'android' ? 68 : 0 }}
      >
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={180}
          contentOffset={{ x: -110 }}
          // decelerationRate="0"
          disableIntervalMomentum
          directionalLockEnabled
          pagingEnabled
          scrollEventThrottle={14}
          contentInset={{ left: 100, right: 100 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          style={{
            width: Dimensions.get('window').width, height: 220, marginTop: 10,
          }}
        >

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={styles.petCard}>
            <Image
              style={styles.petImage}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
          {/* </DropShadow> */}
          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={styles.petCard}>
            <Image
              style={styles.petImage}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
          {/* </DropShadow> */}
          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={styles.petCard}>
            <Image
              style={styles.petImage}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
          {/* </DropShadow> */}
          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={styles.petCard}>
            <Image
              style={styles.petImage}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
          {/* </DropShadow> */}
        </Animated.ScrollView>

        <View style={{
          marginBottom: 20,
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 10,
          padding: 5,
          width: 115,
          alignSelf: 'center',
        }}
        >
          <RNAnimatedScrollIndicators
            numberOfCards={4}
            scrollWidth={115}
            activeColor={pawPink}
            inActiveColor="white"
            scrollAnimatedValue={scrollX}
            style={{

            }}
          />
        </View>

        {/* <DropShadow style={styles.shadowProp}> */}
        <Pressable style={[styles.healthContainer, { height: 200 }]}>
          <Text style={styles.healthHeader}>Upcoming Appointments</Text>
          <View
            style={{
              borderBottomColor: pawPink,
              borderBottomWidth: 3,
              borderRadius: 50,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
        </Pressable>

        {/* </DropShadow> */}
        {/* <DropShadow style={styles.shadowProp}> */}
        <Pressable style={[styles.healthContainer, { height: 150 }]}>
          <Text style={styles.healthHeader}>Did you feed the dog today?</Text>
          <View
            style={{
              borderBottomColor: pawPink,
              borderBottomWidth: 3,
              borderRadius: 50,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
        </Pressable>

        {/* </DropShadow> */}
        {/* <DropShadow style={styles.shadowProp}> */}
        <Pressable style={[styles.healthContainer, { height: 300 }]}>
          <Text style={styles.healthHeader}>Walk Tracker</Text>
          <View
            style={{
              borderBottomColor: pawPink,
              borderBottomWidth: 3,
              borderRadius: 50,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
        </Pressable>

        {/* </DropShadow> */}

      </ScrollView>
    </View>
  );
}
