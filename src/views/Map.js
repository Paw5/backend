import {
  ScrollView, View,
} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from '../components/SearchBarServ';
import styles from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();

export default function MapTab() {
  return (
    <ScrollView>
      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight }} />
      <View style={styles.containerMap}>
        <View><MapView style={styles.map} /></View>
        <View style={styles.search}>
          <SearchBar />
        </View>
      </View>
    </ScrollView>
  );
}
