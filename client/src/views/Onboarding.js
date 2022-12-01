import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Pressable,
  TextInput, Dimensions, FlatList,
  Animated, Platform, ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import axios from 'axios';
import slides from '../components/OnboardingSlides';
import OnboardingItem from '../components/OnboardingItem';
import lstyles, {
  pawGreen, pawPink, pawWhite,
} from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import { reload } from '../redux/SettingsSlice';

// const textInputWidth = Dimensions.get('window').width - 60;
// const maxFontSize = 26;

export default function Onboarding({ setViewedOnboard }) {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [styles, setStyles] = useState(lstyles);
  const [isSigninVisible, setSigninVisible] = useState(false);
  const [formEntry, setFormEntry] = useState({});
  const [isEmailValid, setEmailValid] = useState(false);
  const dispatch = useDispatch();
  let dropdownAlert = useRef();

  const scrollX = new Animated.Value(0);

  const registerUser = async () => {
    axios.post('https://www.paw-5.com/login', formEntry).then(async (res) => {
      if (res.status === 200) {
        return res.data;
      }
      if (res.status === 409) throw new Error('Conflict');
      throw new Error('Bad Request');
    })
      .then(async (json) => {
        AsyncStorage.setItem('@loginToken', json.data.attributes[0]);
        setRegisterVisible(false);
        setViewedOnboard(true);
        setFormEntry({});
      })
      .catch((r) => {
        if (r.message === 'Conflict') dropdownAlert.alertWithType('custom', 'Error', 'That username or email already exists');
        else if (r.message === 'Bad Request') dropdownAlert.alertWithType('custom', 'Error', 'Something went wrong');
        else dropdownAlert.alertWithType('custom', 'Error', r.message);
      });
  };

  const updateFormEntry = (key, value) => {
    const newFormEntry = formEntry;
    newFormEntry[key] = value;
    setFormEntry(newFormEntry);
  };

  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  /* toggle sigin section modal */
  const toggleSignin = () => {
    setSigninVisible(!isSigninVisible);
  };

  /* toggle register section modal */
  const toggleRegister = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const toggleHideConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  /* const [fontSize, setFontSize] = React.useState(maxFontSize);

  const scaleFontSize = (width) => {
    const actualWidth = width + fontSize;
    const scaledSize = Math.min(maxFontSize, fontSize * (textInputWidth / actualWidth));

    setFontSize(scaledSize);
  };

  const onContentSizeChange = ({ nativeEvent }) => {
    const { contentSize } = nativeEvent;
    const { width } = contentSize;

    scaleFontSize(width);
  }; */

  return (
    <View style={{
      flex: 1, backgroundColor: pawPink,
    }}
    >
      <View style={styles.statusBar} />
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
        style={{ height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 290 : 230) }}
      />
      <RNAnimatedScrollIndicators
        numberOfCards={3}
        scrollWidth={Dimensions.get('window').width}
        activeColor={pawGreen}
        inActiveColor={pawWhite}
        scrollAnimatedValue={scrollX}
        style={{
          flex: 1,
        }}
      />

      <View style={[styles.background, { marginTop: 15 }]}>
        <View style={{
          flex: 1, justifyContent: 'center', flexDirection: 'row', alignContent: 'center', marginTop: 2,
        }}
        >

          <Pressable
            onPress={toggleSignin}
            style={styles.signinbutton}
          >
            <Text style={styles.signintext}>Sign In</Text>
          </Pressable>
          <Pressable
            onPress={toggleRegister}
            style={styles.signinbutton}
          >
            <Text style={styles.signintext}>Register</Text>
          </Pressable>

        </View>

        <Modal
          visible={isSigninVisible}
          animationType="slide"
          style={styles.signinModal}
        >
          <Pressable
            onPress={toggleSignin}
            style={{ alignSelf: 'flex-start' }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color="#333333"
              style={styles.signinExitButton}
            />

          </Pressable>
          <View style={styles.signinHead}>
            <Text style={styles.signinPromptText}>Welcome Back!</Text>
          </View>

          <TextInput
            style={styles.signinField}
            placeholder="username"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            textAlign="center"
            autoCapitalize="none"
          />
          <View>
            <TextInput
              style={styles.signinField}
              placeholder="password"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              secureTextEntry={hidePassword}
              textAlign="center"
            />
            <Pressable style={[styles.signinField, { position: 'absolute', width: 50, right: 20 }]} onPress={toggleHidePassword}>
              <Feather
                name={hidePassword ? 'eye' : 'eye-off'}
                size={30}
                color="#333333"
                style={{ }}
              />
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              AsyncStorage.setItem('@loginToken', 'debug', () => setViewedOnboard(true));
              dispatch(reload());
            }}
            style={[styles.signinPrompt, { marginTop: 15 }]}
          >
            <Text style={styles.signinPromptText}>Sign In</Text>
          </Pressable>
        </Modal>

        <Modal
          visible={isRegisterVisible}
          animationType="modal"
          style={styles.signinModal}
        >
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            <Pressable
              onPress={toggleRegister}
              style={{ alignSelf: 'flex-start' }}
            >
              <Feather
                name="chevron-left"
                size={30}
                color="#333333"
                style={[styles.signinExitButton, { marginBottom: 30 }]}
              />

            </Pressable>

            <View style={styles.signinHead}>
              <Text style={styles.signinPromptText}>Welcome to Paw5!</Text>
            </View>
            <TextInput
              style={[styles.signinField/* , { fontSize } */]}
              placeholder="email"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              keyboardType="email-address"
              secureTextEntry={false}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                if (text) {
                  setEmailValid(validator.isEmail(text));
                  updateFormEntry('email', text);
                }
              }}
            />
            <TextInput
              style={styles.signinField}
              placeholder="first name"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              onChangeText={(text) => updateFormEntry('firstname', text)}
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="email"
            />
            <TextInput
              style={styles.signinField}
              placeholder="last name"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              autoCorrect={false}
              onChangeText={(text) => updateFormEntry('lastname', text)}
            />
            <TextInput
              style={styles.signinField}
              placeholder="username"
              placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
              textAlign="center"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => updateFormEntry('username', text)}
            />
            <View>
              <TextInput
                style={styles.signinField}
                placeholder="password"
                placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
                secureTextEntry={hidePassword}
                textAlign="center"
                autoCorrect={false}
                onChangeText={(text) => updateFormEntry('password', text)}
              />
              <Pressable style={[styles.signinField, { position: 'absolute', width: 50, right: 20 }]} onPress={toggleHidePassword}>
                <Feather
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={30}
                  color="#333333"
                  style={{ }}
                />
              </Pressable>
            </View>
            <View>
              <TextInput
                style={styles.signinField}
                placeholder="retype password"
                placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
                secureTextEntry={hideConfirmPassword}
                autoCorrect={false}
                textAlign="center"
              />
              <Pressable style={[styles.signinField, { position: 'absolute', width: 50, right: 20 }]} onPress={toggleHideConfirmPassword}>
                <Feather
                  name={hideConfirmPassword ? 'eye' : 'eye-off'}
                  size={30}
                  color="#333333"
                  style={{ }}
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                if (formEntry.email && isEmailValid) registerUser();
                else dropdownAlert.alertWithType('custom', 'Warning:', 'Invalid email');
              }}
              style={[styles.signinPrompt, { marginTop: 15 }]}
            >
              <Text style={styles.signinPromptText}>Submit</Text>
            </Pressable>

          </ScrollView>
          <DropdownAlert
            ref={(ref) => {
              if (ref) {
                dropdownAlert = ref;
              }
            }}
            containerStyle={styles.dropDownPaw5}
          />
        </Modal>

      </View>

    </View>
  );
}
