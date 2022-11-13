import {
  View, ScrollView,
} from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBarServ';
import styles, { } from '../constants/Styles';
import PawPicsPost from '../components/PawPicsPost';

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
          style={{ marginBottom: 170 }}
        >
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
          <PawPicsPost />
        </ScrollView>
      </View>
    </View>
  );
}
