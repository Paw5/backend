/* eslint-disable global-require */
import {
  View, Dimensions, Animated, ScrollView,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { pawPink } from '../constants/Styles';
import PetCard from '../components/PetCard';
import HealthComponent from '../components/HealthComponent';

const StatusBarHeight = getStatusBarHeight();

export default function HealthTab() {
  const scrollX = new Animated.Value(0);

  return (

    <View style={{
      flex: 1, backgroundColor: '#69A297',
    }}
    >

      <View style={{ backgroundColor: pawPink, height: StatusBarHeight }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 68 }}
      >
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={Dimensions.get('window').width}
          decelerationRate="fast"
          disableIntervalMomentum
          directionalLockEnabled
          pagingEnabled
          scrollEventThrottle={14}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          style={{
            width: Dimensions.get('window').width,
            height: 220,
            marginTop: 10,
            marginLeft: 10,
          }}
        >

          <PetCard />
          <PetCard />
          <PetCard />
          <PetCard />
        </Animated.ScrollView>

        <View style={{
          marginBottom: 20,
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 10,
          padding: 5,
          width: 115,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        >
          <RNAnimatedScrollIndicators
            numberOfCards={4}
            scrollWidth={Dimensions.get('window').width}
            activeColor={pawPink}
            inActiveColor="white"
            scrollAnimatedValue={scrollX}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View>

        <HealthComponent />
        <HealthComponent />
        <HealthComponent />

      </ScrollView>
    </View>
  );
}
