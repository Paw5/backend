import {
  View, ScrollView, Platform,
} from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBarServ';
import styles, { } from '../constants/Styles';
import PawPostPost from '../components/PawPostPost';

export default function PawPics() {
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
          <PawPostPost />
          <PawPostPost />
          <PawPostPost />
          <PawPostPost />
          <PawPostPost />
          <PawPostPost />
          <PawPostPost />
        </ScrollView>
      </View>
    </View>
  );
}
