/* eslint-disable global-require */
import {
  View, ScrollView, Image, Text,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBarServ';
import styles, { pawPink, pawGreen, pawGrey } from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();
const miso = require('../../assets/miso.jpg');

export default function PMs() {
  const [loaded] = useFonts({
    QuicksandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuicksandLight: require('../../assets/fonts/Quicksand-Light.ttf'),
    QuicksandMedium: require('../../assets/fonts/Quicksand-Medium.ttf'),
    QuicksandRegular: require('../../assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('../../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{
      flex: 1, backgroundColor: pawGreen,
    }}
    >
      <View style={{ backgroundColor: pawPink, height: StatusBarHeight }} />

      <View style={styles.search}>
        <SearchBar />
      </View>

      <ScrollView contentInset={{ bottom: 150 }} style={{ marginTop: 90 }}>
        <View style={styles.pmUserInteraction}>
          <Image
            style={styles.pmUserImage}
            source={miso}
          />
          <View style={styles.pmPreview}>
            <Text style={styles.pmUserPreview}>
              Username
            </Text>
            <Text style={styles.pmUserMessagePreview}>
              Old Message
            </Text>
          </View>
          <View style={styles.pmMessageIcons}>
            <Feather
              name="star"
              size={30}
              color={pawGrey}
            />
            <Feather
              name="send"
              size={30}
              color={pawGrey}
              style={{ paddingTop: 2 }}
            />
          </View>
        </View>

        <View style={styles.pmUserInteraction}>
          <Image
            style={styles.pmUserImage}
            source={miso}
          />
          <View style={styles.pmPreview}>
            <Text style={styles.pmUserPreview}>
              Username
            </Text>
            <Text style={styles.pmUserMessagePreview}>
              New message
            </Text>
          </View>
          <View style={styles.pmMessageIcons}>
            <Feather
              name="alert-circle"
              size={30}
              color={pawGrey}
            />
            <Feather
              name="send"
              size={30}
              color={pawGrey}
              style={{ paddingTop: 2 }}
            />
          </View>
        </View>
      </ScrollView>

    </View>
  );
}
