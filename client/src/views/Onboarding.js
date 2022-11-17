import React, { useState, useEffect } from 'react';
import {
  View, Text, Pressable, TextInput, Dimensions, FlatList, Animated, Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import slides from '../components/OnboardingSlides';
import OnboardingItem from '../components/OnboardingItem';
import lstyles, {
  pawGreen, pawPink, pawWhite,
} from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

// const textInputWidth = Dimensions.get('window').width - 60;
// const maxFontSize = 26;

export default function Onboarding() {
  const scrollX = new Animated.Value(0);

  const endOnboarding = async (/* { navigation } */) => {
    await AsyncStorage.setItem('@viewedOnboard', 'true');
    // navigation.navigate('N');
  };

  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  /* toggle sigin section modal */
  const [isSigninVisible, setSigninVisible] = useState(false);
  const toggleSignin = () => {
    setSigninVisible(!isSigninVisible);
  };

  /* toggle register section modal */
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const toggleRegister = () => {
    setRegisterVisible(!isRegisterVisible);
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
          isVisible={isSigninVisible}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          hasBackdrop={false}
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
          <TextInput
            style={styles.signinField}
            placeholder="password"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            secureTextEntry
            textAlign="center"
          />
          <Pressable onPress={endOnboarding} style={[styles.signinPrompt, { marginTop: 15 }]}>
            <Text style={styles.signinPromptText}>Sign In</Text>
          </Pressable>
        </Modal>

        <Modal
          isVisible={isRegisterVisible}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          hasBackdrop={false}
          style={styles.signinModal}
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
            // onContentSizeChange={onContentSizeChange}
          />
          <TextInput
            style={styles.signinField}
            placeholder="first name"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            textAlign="center"
            secureTextEntry={false}
          />
          <TextInput
            style={styles.signinField}
            placeholder="last name"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            textAlign="center"
            secureTextEntry={false}
          />
          <TextInput
            style={styles.signinField}
            placeholder="username"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            textAlign="center"
            secureTextEntry={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.signinField}
            placeholder="password"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            secureTextEntry
            textAlign="center"
          />
          <TextInput
            style={styles.signinField}
            placeholder="retype password"
            placeholderTextColor={isDarkMode === 'light' ? '#edae4985' : '#33333385'}
            secureTextEntry
            textAlign="center"
          />

          <Pressable onPress={endOnboarding} style={[styles.signinPrompt, { marginTop: 15 }]}>
            <Text style={styles.signinPromptText}>Submit</Text>
          </Pressable>

        </Modal>

      </View>
    </View>
  );
}
