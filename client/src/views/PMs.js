/* eslint-disable global-require */
import {
  View, ScrollView, Platform,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from '../components/SearchBarServ';
import styles, { pawPink, pawGreen } from '../constants/Styles';
import PMUserInteraction from '../components/PMInteraction';

const StatusBarHeight = getStatusBarHeight();

export default function PMs() {
  return (
    <View style={{
      flex: 1, backgroundColor: pawGreen,
    }}
    >
      <View style={{ backgroundColor: pawPink, height: StatusBarHeight }} />

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
