import {
  ScrollView, View,
} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import SearchBar from '../components/SearchBarServ';
import styles from '../constants/Styles';

export default function MapTab() {
  return (
    <ScrollView>
      <View style={styles.containerMap}>
        <View><MapView style={styles.map} /></View>
        <View style={styles.search}>
          <SearchBar />
        </View>
      </View>
    </ScrollView>
  );
}
