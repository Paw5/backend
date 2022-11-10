import {
  View, ScrollView, Platform,
} from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBarServ';
import styles from '../constants/DarkStyles';
import ServNode from '../components/ServiceNode';

export default function ServicesTab() {
  return (

    <View style={styles.background}>
      <View style={styles.statusBar} />
      <View style={styles.search}>
        <SearchBar />
      </View>
      <View style={styles.containerMap}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: Platform.OS === 'android' ? 170 : 190 }}
        >
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
          <ServNode />
        </ScrollView>
      </View>
    </View>
  );
}
