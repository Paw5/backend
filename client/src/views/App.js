/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
// Required imports
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator, View, Image, Dimensions,
} from 'react-native';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar';
import store from '../redux/Store';
import Onboarding from '../components/Onboarding';
import { pawPink } from '../constants/Styles';

const logo = require('../../assets/Paw5Logo.png');

function Load() { // can be used for initializing settings
  return (
    <View style={{
      flex: 1, width: Dimensions.get('window').width, justifyContent: 'center', backgroundColor: pawPink,
    }}
    >
      <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width - 100 }} source={logo} />
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewOnboard, setViewedOnboard] = useState(false);

  const checkOnboard = async () => {
    const val = await AsyncStorage.getItem('@viewedOnboard');
    if (val !== null) {
      setViewedOnboard(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkOnboard();
  }, []);

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
    <Provider store={store}>
      {loading ? <Load /> : viewOnboard ? <NavBar /> : <Onboarding />}
    </Provider>
  );
}

registerRootComponent(App);
