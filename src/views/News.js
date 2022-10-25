/* eslint-disable global-require */
import {
  Pressable, View, Text, Dimensions, ScrollView, StyleSheet,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import DropShadow from 'react-native-drop-shadow';
import { Feather } from '@expo/vector-icons';

const StatusBarHeight = getStatusBarHeight();

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#333333',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  eventTab: {
    alignSelf: 'center',
    height: 'auto',
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
    padding: 35,
    paddingBottom: 30,
    paddingTop: 25,
    marginRight: 15,
    marginLeft: 15,
  },
  eventHeader: {
    fontFamily: 'QuicksandBold',
    fontSize: 26,
  },
  eventDate: {
    fontFamily: 'QuicksandSemiBold',
    fontSize: 20,
    paddingTop: 5,
  },
  eventText: {
    fontFamily: 'QuicksandRegular',
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 30,
    textAlign: 'justify',
  },
  newsTab: {
    alignSelf: 'center',
    marginTop: 20,
    height: 'auto',
    width: Dimensions.get('window').width - 30,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
    padding: 35,
    paddingBottom: 30,
    paddingTop: 25,
    marginRight: 15,
    marginLeft: 15,
  },
  newsHeader: {
    fontFamily: 'QuicksandBold',
    fontSize: 26,
    textAlign: 'center',
  },
});

export default function HealthTab() {
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
      flex: 1, backgroundColor: '#69A297',
    }}
    >

      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight }} />

      <ScrollView
        contentInset={{ bottom: 150 }}
        style={{ marginTop: 20, paddingTop: 20 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentInset={{ left: 50, right: 50 }}
          snapToAlignment="center"
          snapToInterval={Dimensions.get('window').width}
          decelerationRate="fast"
          disableIntervalMomentum
          directionalLockEnabled
          pagingEnabled
          style={{
            width: Dimensions.get('window').width, paddingBottom: 20, marginTop: -20,
          }}
        >
          <DropShadow style={styles.shadowProp}>
            <Pressable style={styles.eventTab}>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5,
              }}
              >
                <Text style={styles.eventHeader}>Event</Text>
                <Text style={styles.eventDate}>00/00/00</Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#e0777d',
                  borderBottomWidth: 3,
                  borderRadius: 50,
                  marginBottom: 15,
                }}
              />

              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', width: 'auto', paddingRight: 20,
              }}
              >
                <Text style={styles.eventText} numberOfLines={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute i
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla paatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>

                <Feather
                  name="arrow-right-circle"
                  size={30}
                  color="#333333"
                  style={{ alignSelf: 'center' }}
                />
              </View>
            </Pressable>
          </DropShadow>

          <DropShadow style={styles.shadowProp}>
            <Pressable style={styles.eventTab}>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5,
              }}
              >
                <Text style={styles.eventHeader}>Event</Text>
                <Text style={styles.eventDate}>00/00/00</Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#e0777d',
                  borderBottomWidth: 3,
                  borderRadius: 50,
                  marginBottom: 15,
                }}
              />

              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', width: 'auto', paddingRight: 20,
              }}
              >
                <Text style={styles.eventText} numberOfLines={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo coequat. Duis aute iru
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fiat nulla pariat.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>

                <Feather
                  name="arrow-right-circle"
                  size={30}
                  color="#333333"
                  style={{ alignSelf: 'center' }}
                />
              </View>
            </Pressable>
          </DropShadow>

          <DropShadow style={styles.shadowProp}>
            <Pressable style={styles.eventTab}>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5,
              }}
              >
                <Text style={styles.eventHeader}>Event</Text>
                <Text style={styles.eventDate}>00/00/00</Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#e0777d',
                  borderBottomWidth: 3,
                  borderRadius: 50,
                  marginBottom: 15,
                }}
              />

              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', width: 'auto', paddingRight: 20,
              }}
              >
                <Text style={styles.eventText} numberOfLines={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo conquat. Duiaute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>

                <Feather
                  name="arrow-right-circle"
                  size={30}
                  color="#333333"
                  style={{ alignSelf: 'center' }}
                />
              </View>
            </Pressable>
          </DropShadow>
        </ScrollView>

        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 10,
          }}
        />

        <DropShadow style={styles.shadowProp}>
          <Pressable style={styles.newsTab}>
            <Text style={styles.newsHeader}>Breaking News!</Text>

            <View
              style={{
                borderBottomColor: '#e0777d',
                borderBottomWidth: 3,
                borderRadius: 50,
                marginBottom: 15,
              }}
            />

            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', width: 'auto', paddingRight: 20,
            }}
            >
              <Text style={styles.eventText} numberOfLines={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo conquat. Duiaute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>

              <Feather
                name="arrow-right-circle"
                size={30}
                color="#333333"
                style={{ alignSelf: 'center' }}
              />
            </View>
          </Pressable>
        </DropShadow>

        <DropShadow style={styles.shadowProp}>
          <Pressable style={styles.newsTab}>
            <Text style={styles.newsHeader}>Breaking News!</Text>

            <View
              style={{
                borderBottomColor: '#e0777d',
                borderBottomWidth: 3,
                borderRadius: 50,
                marginBottom: 15,
              }}
            />

            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', width: 'auto', paddingRight: 20,
            }}
            >
              <Text style={styles.eventText} numberOfLines={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo conquat. Duiaute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>

              <Feather
                name="arrow-right-circle"
                size={30}
                color="#333333"
                style={{ alignSelf: 'center' }}
              />
            </View>
          </Pressable>
        </DropShadow>

        <DropShadow style={styles.shadowProp}>
          <Pressable style={styles.newsTab}>
            <Text style={styles.newsHeader}>Breaking News!</Text>

            <View
              style={{
                borderBottomColor: '#e0777d',
                borderBottomWidth: 3,
                borderRadius: 50,
                marginBottom: 15,
              }}
            />

            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', width: 'auto', paddingRight: 20,
            }}
            >
              <Text style={styles.eventText} numberOfLines={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo conquat. Duiaute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>

              <Feather
                name="arrow-right-circle"
                size={30}
                color="#333333"
                style={{ alignSelf: 'center' }}
              />
            </View>
          </Pressable>
        </DropShadow>
      </ScrollView>
    </View>
  );
}
