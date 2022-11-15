import {
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from '../components/SearchBarServ';
import lstyles, { } from '../constants/Styles';
import dstyles from '../constants/DarkStyles';

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
            userInterfaceStyle={isDarkMode === 'light' ? 'dark' : 'light'}
            style={styles.map}
          />

        </View>
      </View>
      <View style={[styles.search, { position: 'absolute', top: StatusBarHeight }]}>
        <SearchBar />
      </View>
    </View>
  );
}
