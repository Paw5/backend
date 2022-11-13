import {
  View, ScrollView, Platform,
} from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBarServ';
import styles, { } from '../constants/Styles';
import PMUserInteraction from '../components/PMInteraction';

export default function PMs() {
  return (
    <View style={styles.background}>
      <View style={styles.statusBar} />

      <View style={styles.search}>
        <SearchBar />
      </View>

      <ScrollView
        contentInset={{ bottom: 160 }}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: Platform.OS === 'android' ? 170 : 0 }}
      >

        <PMUserInteraction />
        <PMUserInteraction />
        <PMUserInteraction />
        <PMUserInteraction />

      </ScrollView>
    </View>
  );
}
