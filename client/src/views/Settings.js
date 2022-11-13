import {
  View, Text, Dimensions, Switch, Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
// import Onboarding from 'react-native-onboarding-swiper';
import lstyles, {
  pink2green, white2lgrey, pawGrey,
} from '../constants/Styles';
import dstyles, {
// dpink2green, dwhite2lgrey, dpawGrey,
} from '../constants/DarkStyles';

/*
AsyncStorage.getItem('darkLight').then((darkLight) => {
  import('../constants/Styles').then((styles) => {
    console.log(styles);
  });
}); */

/* GET LIGHT DARK START */
const dlKey = '@darkLight';

export default function ServicesTab() {
  const [styleNow, setStyleNow] = useState('dark');
  const [styles, setStyles] = useState(lstyles);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem(dlKey);

      return data;
    } catch (e) {
      return (e);
    }
  };

  const onChange = async () => {
    await setStyleNow((s) => (s === 'light' ? 'dark' : 'light'));
    AsyncStorage.setItem(dlKey, styleNow);
    getData();
  };
  /* GET LIGHT DARK END */

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

  /* toggle onboarding replay modal */
  const [isOnboardVisible, setOnboardVisible] = useState(false);
  const toggleOnboard = () => {
    setOnboardVisible(!isOnboardVisible);
  };

  useEffect(() => {
    if (styleNow === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [styleNow]);

  return (
    /* background color */
    <View style={styles.background}>

      {/* status bar background color */}
      <View style={[styles.statusBar, { marginBottom: 30 }]} />

      {/* settings icon header */}
      <View>
        <Feather
          name="settings"
          size={100}
          color={pawGrey}
          style={styles.settingsIcon}
        />
      </View>

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
          trackColor={{ false: '#e0777d', true: '#edae49' }}
          thumbColor={white2lgrey}
          ios_backgroundColor="#e0777d"
          onValueChange={lightdarkSwitch}
          onChange={onChange}
          value={LDisEnabled}
        />
      </View>

      {/* location services toggle option */}
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
          trackColor={{ false: pink2green, true: pawGrey }}
          thumbColor={white2lgrey}
          ios_backgroundColor={pink2green}
          onValueChange={locationSwitch}
          value={LCisEnabled}
        />
      </View>

      {/* notifications button to activate notifications options modal */}
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
            <Feather
              name="mail"
              size={100}
              color={pawGrey}
              style={styles.settingsIcon}
            />
          </View>

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
              trackColor={{ false: pink2green, true: pawGrey }}
              thumbColor={white2lgrey}
              ios_backgroundColor={pink2green}
              onValueChange={emailSwitch}
              value={EMisEnabled}
            />
          </View>

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
              trackColor={{ false: pink2green, true: pawGrey }}
              thumbColor={white2lgrey}
              ios_backgroundColor={pink2green}
              onValueChange={messagesSwitch}
              value={MSisEnabled}
            />
          </View>

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
              trackColor={{ false: pink2green, true: pawGrey }}
              thumbColor={white2lgrey}
              ios_backgroundColor={pink2green}
              onValueChange={commentsSwitch}
              value={CMisEnabled}
            />
          </View>

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
              trackColor={{ false: pink2green, true: pawGrey }}
              thumbColor={white2lgrey}
              ios_backgroundColor={pink2green}
              onValueChange={likesSwitch}
              value={LKisEnabled}
            />
          </View>
        </View>
      </Modal>

      {/* help options section modal activator */}
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
            <Feather
              name="help-circle"
              size={100}
              color={pawGrey}
              style={styles.settingsIcon}
            />
          </View>

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

          {/* contact button to send to email */}
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

          <Pressable style={[styles.settingsItem, { marginRight: 20, width: Dimensions.get('window').width - 40 }]} onPress={toggleOnboard}>
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
