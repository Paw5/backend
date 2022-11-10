import {
  View,
} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from '../components/SearchBarServ';
import styles, { mapColor } from '../constants/DarkStyles';

const StatusBarHeight = getStatusBarHeight();

export default function MapTab() {
  return (
    <View>
      <View style={styles.statusBar} />
      <View style={styles.containerMap}>
        <View>
          <MapView
            userInterfaceStyle={mapColor}
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
