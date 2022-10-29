import {
  View,
} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from '../components/SearchBarServ';
import styles, { pawPink } from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();

export default function MapTab() {
  return (
    <View>
      <View style={{ backgroundColor: pawPink, height: StatusBarHeight }} />
      <View style={styles.containerMap}>
        <View><MapView style={styles.map} /></View>
      </View>
      <View style={[styles.search, { position: 'absolute', top: StatusBarHeight }]}>
        <SearchBar />
      </View>
    </View>
  );
}
