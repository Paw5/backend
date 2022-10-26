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
  profileIcon: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 40,
  },
  accountSwitch: {
    flexBasis: 'auto',
  },
  exitButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    paddingRight: 11,
    paddingLeft: 9,
    marginLeft: 20,
  },
  accountModal: {
    backgroundColor: '#69A297',
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: StatusBarHeight,
    marginBottom: 150,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  petImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#e0777d',
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  petHeader: {
    fontSize: 32,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 5,
    fontFamily: 'QuicksandBold',
    color: '#333333',
    flexBasis: 'auto',
    paddingLeft: 5,
  },
  petCard: {
    height: 200,
    width: 160,
    backgroundColor: 'white',
    color: '#333333',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    margin: 10,
    marginTop: 0,
    marginBottom: -30,
    borderRadius: 25,
  },
  cameraIcon: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    position: 'absolute',
    right: 120,
    bottom: 40,
    padding: 8,
    paddingLeft: 9,
    borderRadius: 23,
    overflow: 'hidden',
  },
});

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
      flex: 1, backgroundColor: '#69A297',
    }}
    >

      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight, marginBottom: 30 }} />
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
      <View style={[styles.menuItem, { marginBottom: 50, justifyContent: 'center', backgroundColor: '#e0777d' }]}>
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
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: '#e0777d' }]}
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
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: '#e0777d' }]}
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
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: '#e0777d' }]}
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
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: '#e0777d' }]}
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
              style={[styles.menuText, { fontSize: 18, width: 'auto', color: '#e0777d' }]}
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
                width: Dimensions.get('window').width, marginTop: 100, marginBottom: 50, paddingBottom: 50,
              }}
            >

              {/* <DropShadow style={styles.shadowProp}> */}
              <Pressable style={styles.petCard}>
                <Image
                  style={styles.petImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.petHeader}
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
              <Pressable style={styles.petCard}>
                <Image
                  style={styles.petImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.petHeader}
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
              <Pressable style={styles.petCard}>
                <Image
                  style={styles.petImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.petHeader}
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
              <Pressable style={styles.petCard}>
                <Image
                  style={styles.petImage}
                  source={miso}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={styles.petHeader}
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
