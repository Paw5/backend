import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import React from 'react';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  pannel: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0777D',
  },
});
export default function CommunityTab() {
  return (
    <View style={styles.container}>
      <View style={styles.pannel}>
        <Text>Community Tab</Text>
      </View>
    </View>
  );
}
