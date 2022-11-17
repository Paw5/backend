import {
  View, Image, Pressable, Text, ScrollView, Animated, Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import Modal from 'react-native-modal';
import lstyles, { pawWhite, pawPink } from '../constants/Styles';
import dstyles, {
  pawYellow, pawLightGrey,
} from '../constants/DarkStyles';
import ProfilePhotoCard from './ProfilePhotoCard';
import ProfilePostCard from './ProfilePostCard';

const miso = require('../../assets/miso.jpg');

export default function ProfileClick() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  const scrollX = new Animated.Value(0);

  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (

    <View>
      <Pressable style={styles.ppProfileImageHolder} onPress={toggleProfile}>
        <Image
          style={styles.ppProfileImage}
          source={miso}
        />
      </Pressable>

      <Modal
        isVisible={isProfileVisible}
        onBackdropPress={() => isProfileVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.oProfModal}
      >
        <View>
          <Image
            style={styles.oProfileImage}
            source={miso}
          />
          <Pressable
            onPress={toggleProfile}
            style={{
              alignSelf: 'flex-start', position: 'absolute', margin: 10,
            }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={isDarkMode === 'light' ? pawYellow : pawWhite}
              style={styles.exitProfButton}
            />

          </Pressable>
          <View style={styles.oProfileBio}>
            <Text style={styles.oProfBioText} numberOfLines={6}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.

            </Text>
          </View>
          <View style={styles.oProfileName}>
            <Text style={styles.oProfNameText}>@user-name</Text>
          </View>
          <View
            style={styles.profBottomBand}
          />
          <View style={styles.scrollIndicatorProfile}>
            <RNAnimatedScrollIndicators
              numberOfCards={2}
              scrollWidth={Dimensions.get('window').width}
              activeColor={isDarkMode === 'light' ? pawYellow : pawPink}
              inActiveColor={isDarkMode === 'light' ? pawLightGrey : pawWhite}
              scrollAnimatedValue={scrollX}
            />
          </View>
        </View>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: Dimensions.get('window').width, height: Dimensions.get('window').height, left: -12, marginBottom: 170,
            }}
          >
            <View style={styles.photoGrid}>
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
              <ProfilePhotoCard />
            </View>
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: Dimensions.get('window').width, height: Dimensions.get('window').height, left: -10, marginBottom: 170,
            }}
          >
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
            <ProfilePostCard />
          </ScrollView>
        </Animated.ScrollView>
      </Modal>
    </View>

  );
}
