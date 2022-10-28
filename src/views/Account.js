/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import {
  View, Text, Dimensions, StyleSheet, Pressable, Image, ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import styles, { pawPink, pawGreen } from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();
const miso = require('../../assets/miso.jpg');

export default function ServicesTab() {
  /* toggle profile section modal */
  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  /* toggle pet section modal */
  const [isPetsVisible, setPetsVisible] = useState(false);
  const togglePets = () => {
    setPetsVisible(!isPetsVisible);
  };

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
      flex: 1, backgroundColor: pawGreen,
    }}
    >

      <View style={{ backgroundColor: pawPink, height: StatusBarHeight, marginBottom: 30 }} />
      <View>
        {/* <DropShadow style={styles.shadowProp}> */}
        <View style={styles.profileBorder}>
          <Image
            style={styles.profileImage}
            source={miso}
          />
        </View>
        {/* </DropShadow> */}
      </View>
      {/* <DropShadow style={styles.shadowProp}> */}
      <View style={[styles.menuItem, { marginBottom: 50, justifyContent: 'center', backgroundColor: pawPink }]}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.menuText, { width: 'auto', fontSize: 32, color: 'white' }]}
        >
          UserName
        </Text>

      </View>

      {/* </DropShadow> */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable onPress={toggleProfile} style={styles.menuItem}>
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

      {/* </DropShadow> */}

      {/* profile options modal */}
      <Modal
        isVisible={isProfileVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
      >
        <View>
          <Pressable
            onPress={toggleProfile}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color="#333333"
              style={styles.exitButton}
            />

          </Pressable>

          <View>
            {/* <DropShadow style={styles.shadowProp}> */}
            <View style={{ justifyContent: 'flex-end' }}>
              <Image
                resizeMode="cover"
                style={styles.profileIcon}
                source={miso}
              />
              <Pressable>
                <Feather
                  name="camera"
                  size={30}
                  color="#e0777d"
                  style={styles.cameraIcon}
                />
              </Pressable>
            </View>
            {/* </DropShadow> */}
          </View>

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: pawPink }]}
            >
              Username
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: pawPink }]}
            >
              First Name
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: pawPink }]}
            >
              Last Name
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Users name
            </Text>
          </Pressable>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: pawPink }]}
            >
              Date of Birth
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Date
            </Text>
          </Pressable>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.menuItem, { width: Dimensions.get('window').width - 40 }]}>
            <Text
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: pawPink }]}
            >
              Location
            </Text>
            <Text
              style={[styles.menuText, { fontSize: 22, width: 'auto' }]}
            >
              Location Data
            </Text>
          </Pressable>
          {/* </DropShadow> */}

        </View>
      </Modal>

      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable onPress={togglePets} style={styles.menuItem}>
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

      {/* </DropShadow> */}

      {/* pets options modal */}
      <Modal
        isVisible={isPetsVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.accountModal}
      >
        <View>
          <Pressable
            onPress={togglePets}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color="#333333"
              style={styles.exitButton}
            />

          </Pressable>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={180}
              contentOffset={{ x: -110 }}
              // decelerationRate="fast"
              disableIntervalMomentum
              directionalLockEnabled
              pagingEnabled
              contentInset={{ left: 100, right: 100 }}
              style={{
                height: 300, width: Dimensions.get('window').width, marginTop: 100,
              }}
            >

              {/* <DropShadow style={styles.shadowProp}> */}
              <Pressable style={styles.accountCard}>
                <Image
                  style={styles.accountImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.accountHeader}
                  >
                    Miso
                  </Text>
                  <Pressable>
                    <Feather
                      name="x-circle"
                      size={30}
                      color="#e0777d"
                      style={{ alignSelf: 'center', paddingLeft: 10, paddingTop: 10 }}
                    />
                  </Pressable>
                </View>
              </Pressable>
              {/* </DropShadow> */}

              {/* <DropShadow style={styles.shadowProp}> */}
              <Pressable style={styles.accountCard}>
                <Image
                  style={styles.accountImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.accountHeader}
                  >
                    Miso
                  </Text>
                  <Pressable>
                    <Feather
                      name="x-circle"
                      size={30}
                      color="#e0777d"
                      style={{ alignSelf: 'center', paddingLeft: 10, paddingTop: 10 }}
                    />
                  </Pressable>
                </View>
              </Pressable>
              {/* </DropShadow> */}

              {/* <DropShadow style={styles.shadowProp}> */}
              <Pressable style={styles.accountCard}>
                <Image
                  style={styles.accountImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.accountHeader}
                  >
                    Miso
                  </Text>
                  <Pressable>
                    <Feather
                      name="x-circle"
                      size={30}
                      color="#e0777d"
                      style={{ alignSelf: 'center', paddingLeft: 10, paddingTop: 10 }}
                    />
                  </Pressable>
                </View>
              </Pressable>
              {/* </DropShadow> */}

              {/* <DropShadow style={styles.shadowProp}> */}
              <Pressable style={styles.accountCard}>
                <Image
                  style={styles.accountImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.accountHeader}
                  >
                    Miso
                  </Text>
                  <Pressable>
                    <Feather
                      name="x-circle"
                      size={30}
                      color="#e0777d"
                      style={{ alignSelf: 'center', paddingLeft: 10, paddingTop: 10 }}
                    />
                  </Pressable>
                </View>
              </Pressable>
              {/* </DropShadow> */}
            </ScrollView>

            {/* <DropShadow style={styles.shadowProp}> */}
            <Pressable style={[styles.menuItem, { marginTop: 20, width: Dimensions.get('window').width - 40 }]}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.menuText}
              >
                Add Pet
              </Text>
              <Feather
                name="plus-circle"
                size={30}
                color="#e0777d"
                style={{ marginRight: -5 }}
              />
            </Pressable>
            {/* </DropShadow> */}
          </View>

        </View>
      </Modal>

      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable style={styles.menuItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Sign out
        </Text>

      </Pressable>

      {/* </DropShadow> */}
    </View>
  );
}
