import { View, Text } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';

export default function SettingsPage() {
  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#69A297', paddingTop: Constants.statusBarHeight,
    }}
    >
      <Text>Account Page</Text>
    </View>
  );
}
