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
import styles, { pawPink, pawGreen, pawGrey } from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();

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
      flex: 1, backgroundColor: pawGreen,
    }}
    >

      {/* status bar background color */}
      <View style={{ backgroundColor: pawPink, height: StatusBarHeight, marginBottom: 30 }} />

      {/* settings icon header */}
      <View>
        {/* <DropShadow style={styles.shadowProp}> */}
        <Feather
          name="settings"
          size={100}
          color={pawGrey}
          style={styles.settingsIcon}
        />
        {/* </DropShadow> */}
      </View>

      {/* dark/light mode toggle option */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <View style={styles.settingsItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.settingsText}
        >
          Dark/Light Mode
        </Text>
        <Switch
          style={styles.settingsSwitch}
          trackColor={{ false: pawPink, true: '#edae49' }}
          thumbColor="white"
          ios_backgroundColor={pawPink}
          onValueChange={lightdarkSwitch}
          value={LDisEnabled}
        />
      </View>

      {/* </DropShadow> */}

      {/* location services toggle option */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <View style={styles.settingsItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.settingsText}
        >
          Disable Location Services
        </Text>
        <Switch
          style={styles.settingsSwitch}
          trackColor={{ false: pawPink, true: pawGrey }}
          thumbColor="white"
          ios_backgroundColor={pawPink}
          onValueChange={locationSwitch}
          value={LCisEnabled}
        />
      </View>

      {/* </DropShadow> */}

      {/* notifications button to activate notifications options modal */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable onPress={toggleNotif} style={styles.settingsItem}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.settingsText}
        >
          Notifications
        </Text>
        <Feather
          name="chevron-right"
          size={30}
          color={pawGrey}
          style={{ marginRight: -5 }}
        />

      </Pressable>

      {/* </DropShadow> */}

      {/* notification options modal */}
      <Modal
        isVisible={isNotifVisible}
        onBackdropPress={() => isNotifVisible}
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
              color={pawGrey}
              style={styles.settingsExitButton}
            />

          </Pressable>

          <View>
            {/* <DropShadow style={styles.shadowProp}> */}
            <Feather
              name="mail"
              size={100}
              color={pawGrey}
              style={styles.settingsIcon}
            />
            {/* </DropShadow> */}
          </View>

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Email Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: pawPink, true: pawGrey }}
              thumbColor="white"
              ios_backgroundColor={pawPink}
              onValueChange={emailSwitch}
              value={EMisEnabled}
            />
          </View>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Messages Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: pawPink, true: pawGrey }}
              thumbColor="white"
              ios_backgroundColor={pawPink}
              onValueChange={messagesSwitch}
              value={MSisEnabled}
            />
          </View>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Comments Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: pawPink, true: pawGrey }}
              thumbColor="white"
              ios_backgroundColor={pawPink}
              onValueChange={commentsSwitch}
              value={CMisEnabled}
            />
          </View>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
          <View style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Likes Notifications
            </Text>
            <Switch
              style={styles.settingsSwitch}
              trackColor={{ false: pawPink, true: pawGrey }}
              thumbColor="white"
              ios_backgroundColor={pawPink}
              onValueChange={likesSwitch}
              value={LKisEnabled}
            />
          </View>
          {/* </DropShadow> */}
        </View>
      </Modal>

      {/* help options section modal activator */}
      {/* <DropShadow style={styles.shadowProp}> */}
      <Pressable style={styles.settingsItem} onPress={toggleHelp}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.settingsText}
        >
          Help
        </Text>
        <Feather
          name="chevron-right"
          size={30}
          color={pawGrey}
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
              color={pawGrey}
              style={styles.settingsExitButton}
            />

          </Pressable>

          <View>
            {/* <DropShadow style={styles.shadowProp}> */}
            <Feather
              name="help-circle"
              size={100}
              color={pawGrey}
              style={styles.settingsIcon}
            />
            {/* </DropShadow> */}
          </View>

          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              FAQ
            </Text>
            <Feather
              name="chevron-right"
              size={30}
              color={pawGrey}
              style={{ marginRight: -5 }}
            />
          </Pressable>
          {/* </DropShadow> */}

          {/* contact button to send to email */}
          {/* <DropShadow style={styles.shadowProp}> */}
          <Pressable style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Contact Us
            </Text>
            <Feather
              name="chevron-right"
              size={30}
              color={pawGrey}
              style={{ marginRight: -5 }}
            />
          </Pressable>
          {/* </DropShadow> */}
          <Pressable style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]} onPress={{/* PLAY ONBOARDNG */}}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.settingsText}
            >
              Onboarding
            </Text>
            <Feather
              name="chevron-right"
              size={30}
              color={pawGrey}
              style={{ marginRight: -5 }}
            />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
