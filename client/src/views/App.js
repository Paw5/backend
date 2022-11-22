/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
// Required imports
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator, View, Image, Dimensions,
} from 'react-native';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar';
import store from '../redux/Store';
import Onboarding from './Onboarding';
import { pawPink } from '../constants/Styles';
import { setLocation as setLocationStore } from '../redux/LocationSlice';

const logo = require('../../assets/Paw5Logo.png');

function Load({ setLocation }) { // can be used for initializing settings
  const dispatch = useDispatch();
  useEffect(
    () => {
      (async () => {
        await AsyncStorage.setItem('@loading', 'true');
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        // eslint-disable-next-line no-shadow
        const location = await Location.getCurrentPositionAsync({});
        dispatch(setLocationStore(location));
        await AsyncStorage.setItem('@loading', 'false');

        setLocation(location);
      })();
    },
    [],
  );

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
  const [viewOnboard, setViewedOnboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ coords: { latitude: 0, longitude: 0 } });

  useEffect(() => {
    if (location.coords.latitude && location.coords.longitude) {
      setLoading(false);
    }
  }, [location.coords.latitude, location.coords.longitude]);

  const checkOnboard = async () => {
    const val = await AsyncStorage.getItem('@viewedOnboard');
    if (val !== null) {
      setViewedOnboard(true);
    }
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
      {loading ? <Load setLocation={setLocation} /> : (viewOnboard ? <NavBar /> : <Onboarding />)}
    </Provider>
  );
}

registerRootComponent(App);
