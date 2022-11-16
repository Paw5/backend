import {
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from '../components/SearchBarServ';
import lstyles from '../constants/Styles';
import dstyles from '../constants/DarkStyles';
import lightMap from '../constants/lightMap.json';
import darkMap from '../constants/darkMap.json';

const StatusBarHeight = getStatusBarHeight();

export default function MapTab() {
  const [styles, setStyles] = useState(lstyles);
  const isDarkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (isDarkMode === 'light') setStyles(dstyles);
    else setStyles(lstyles);
  }, [isDarkMode]);

  return (
    <View>
      <View style={styles.statusBar} />
      <View style={styles.containerMap}>
        <View>
          <MapView
            style={styles.map}
            customMapStyle={isDarkMode === 'light' ? darkMap : lightMap}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            followsUserLocation
            region={{
              latitude: 33.2148,
              longitude: -97.1331,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
            initialRegion={{
              latitude: 33.2148,
              longitude: -97.1331,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          />

        </View>
      </View>
      <View style={[styles.search, { position: 'absolute', top: StatusBarHeight }]}>
        <SearchBar />
      </View>
    </View>
  );
}
