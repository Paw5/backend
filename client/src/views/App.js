/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
// Required imports
import React, { useState } from 'react';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationLoader from './LocationLoader';
import NavBar from '../components/NavBar';
import store from '../redux/Store';
import Onboarding from './Onboarding';
import Loader from './Loader';

export default function App() {
  const [viewedOnboard, setViewedOnboard] = useState(false);
  const [loginToken, setLoginToken] = useState(null);
  const [fetchingToken, setFetchingToken] = useState(true);

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

  console.debug('Viewed onboard?', viewedOnboard);

  AsyncStorage.getItem('@loginToken').then((token) => {
    setFetchingToken(false);
    setLoginToken(token);
  });

  return (
    <Provider store={store}>
      <LocationLoader />
      <Loader show={fetchingToken}>
        {loginToken
          ? <NavBar />
          : <Onboarding setViewedOnboard={setViewedOnboard} />}
      </Loader>
    </Provider>
  );
}

registerRootComponent(App);
