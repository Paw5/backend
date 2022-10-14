import {
  ScrollView, View, StyleSheet, Dimensions,
} from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import SearchBar from '../components/SearchBarServ';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  search: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default function MapTab() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View><MapView style={styles.map} /></View>
        <View style={styles.search}>
          <SearchBar />
        </View>
      </View>
    </ScrollView>
  );
}
