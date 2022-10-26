/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import {
  View, Text, Dimensions, StyleSheet, Switch, Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import { DropShadow } from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

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
    paddingRight: 10,
  },
  settingsSwitch: {
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
  },
  settingsModal: {
    backgroundColor: '#69A297',
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: StatusBarHeight,
    marginBottom: 150,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
  },
});

export default function ServicesTab() {
  /* toggle switch section */
  const [LDisEnabled, LSsetIsEnabled] = useState(false);
  const [LCisEnabled, LCsetIsEnabled] = useState(false);
  const [EMisEnabled, EMsetIsEnabled] = useState(false);
  const [MSisEnabled, MSsetIsEnabled] = useState(false);
  const [CMisEnabled, CMsetIsEnabled] = useState(false);
  const [LKisEnabled, LKsetIsEnabled] = useState(false);
  const lightdarkSwitch = () => LSsetIsEnabled((previousState) => !previousState);
  const locationSwitch = () => LCsetIsEnabled((previousState) => !previousState);
  const emailSwitch = () => EMsetIsEnabled((previousState) => !previousState);
  const messagesSwitch = () => MSsetIsEnabled((previousState) => !previousState);
  const commentsSwitch = () => CMsetIsEnabled((previousState) => !previousState);
  const likesSwitch = () => LKsetIsEnabled((previousState) => !previousState);

  /* toggle notification section modal */
  const [isNotifVisible, setNotifVisible] = useState(false);
  const toggleNotif = () => {
    setNotifVisible(!isNotifVisible);
  };

  /* toggle help section modal */
  const [isHelpVisible, setHelpVisible] = useState(false);
  const toggleHelp = () => {
    setHelpVisible(!isHelpVisible);
  };

  /* add native fonts */
  const [loaded] = useFonts({
    QuicksandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuicksandLight: require('../../assets/fonts/Quicksand-Light.ttf'),
    QuicksandMedium: require('../../assets/fonts/Quicksand-Medium.ttf'),
    QuicksandRegular: require('../../assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  /* if fonts not loaded, error */
  if (!loaded) {
    return null;
  }

  return (
    /* background color */
    <View style={{
      flex: 1, backgroundColor: '#69A297',
    }}
    >

      {/* status bar background color */}
      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight, marginBottom: 30 }} />

      {/* settings icon header */}
      <View>
        {/* <DropShadow style={styles.shadowProp}> */}
        <Feather
          name="settings"
          size={100}
          color="#333333"
          style={styles.settingsIcon}
        />
        {/* </DropShadow> */}
      </View>

      {/* dark/light mode toggle option */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <View style={styles.menuItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Dark/Light Mode
        </Text>
        <Switch
          style={styles.settingsSwitch}
          trackColor={{ false: '#e0777d', true: '#edae49' }}
          thumbColor="white"
          ios_backgroundColor="#e0777d"
          onValueChange={lightdarkSwitch}
          value={LDisEnabled}
        />
      </View>

      {/* </DropShadow> */}

      {/* location services toggle option */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <View style={styles.menuItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.menuText}
        >
          Disable Location Services
        </Text>
        <Switch
          style={styles.settingsSwitch}
          trackColor={{ false: '#e0777d', true: '#333333' }}
          thumbColor="white"
          ios_backgroundColor="#e0777d"
          onValueChange={locationSwitch}
          value={LCisEnabled}
        />
      </View>

      {/* </DropShadow> */}

      {/* notifications button to activate notifications options modal */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable onPress={toggleNotif} style={styles.menuItem}>
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

      {/* </DropShadow> */}

      {/* notification options modal */}
      <Modal
        isVisible={isNotifVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.settingsModal}
      >
        <View>
          <Pressable
            onPress={toggleNotif}
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
            <Feather
              name="mail"
              size={100}
              color="#333333"
              style={styles.settingsIcon}
            />
            {/* </DropShadow> */}
          </View>

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.menuItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.menuText}
            >
              Email Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: '#e0777d', true: '#333333' }}
              thumbColor="white"
              ios_backgroundColor="#e0777d"
              onValueChange={emailSwitch}
              value={EMisEnabled}
            />
          </View>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.menuItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.menuText}
            >
              Messages Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: '#e0777d', true: '#333333' }}
              thumbColor="white"
              ios_backgroundColor="#e0777d"
              onValueChange={messagesSwitch}
              value={MSisEnabled}
            />
          </View>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.menuItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.menuText}
            >
              Comments Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: '#e0777d', true: '#333333' }}
              thumbColor="white"
              ios_backgroundColor="#e0777d"
              onValueChange={commentsSwitch}
              value={CMisEnabled}
            />
          </View>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.menuItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.menuText}
            >
              Likes Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: '#e0777d', true: '#333333' }}
              thumbColor="white"
              ios_backgroundColor="#e0777d"
              onValueChange={likesSwitch}
              value={LKisEnabled}
            />
          </View>
          {/* </DropShadow> */}
        </View>
      </Modal>

      {/* help options section modal activator */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable style={styles.menuItem} onPress={toggleHelp}>
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

      {/* </DropShadow> */}

      {/* help options modal */}
      <Modal
        isVisible={isHelpVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.settingsModal}
      >
        <View>
          <Pressable
            onPress={toggleHelp}
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
            <Feather
              name="help-circle"
              size={100}
              color="#333333"
              style={styles.settingsIcon}
            />
            {/* </DropShadow> */}
          </View>

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.menuItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.menuText}
            >
              FAQ
            </Text>
            <Feather
              name="chevron-right"
              size={30}
              color="#333333"
              style={{ marginRight: -5 }}
            />
          </Pressable>
          {/* </DropShadow> */}

          {/* contact button to send to email */}
          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.menuItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.menuText}
            >
              Contact Us
            </Text>
            <Feather
              name="chevron-right"
              size={30}
              color="#333333"
              style={{ marginRight: -5 }}
            />
          </Pressable>
          {/* </DropShadow> */}

        </View>
      </Modal>
    </View>
  );
}
