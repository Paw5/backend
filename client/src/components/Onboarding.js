import React from 'react';
import {
  View, FlatList, Animated, Dimensions, Pressable,
} from 'react-native';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import slides from './OnboardingSlides';
import OnboardingItem from './OnboardingItem';
import lstyles, {
  pawGreen, pawPink, pawGrey, pawWhite,
} from '../constants/Styles';

export default function Onboarding() {
  const scrollX = new Animated.Value(0);

  const endOnboarding = async ({ navigation }) => {
    await AsyncStorage.setItem('@viewedOnboard', 'true');
    navigation.navigate('N');
  };

  return (
    <View style={{
      flex: 1, backgroundColor: pawGreen,
    }}
    >
      <View style={lstyles.statusBar} />
      <RNAnimatedScrollIndicators
        numberOfCards={4}
        scrollWidth={Dimensions.get('window').width}
        activeColor={pawPink}
        inActiveColor={pawWhite}
        scrollAnimatedValue={scrollX}
        style={{
          flex: 1,
          top: 100,
        }}
      />
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
      />
      <Pressable
        onPress={endOnboarding}
        style={{
          alignSelf: 'center', position: 'absolute', bottom: 25,
        }}
      >
        <Feather
          name="chevron-right"
          size={30}
          color={pawGrey}
          style={lstyles.settingsExitButton}
        />

      </Pressable>
    </View>
  );
}
