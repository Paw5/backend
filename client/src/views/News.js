import {
  Pressable, View, Text, Dimensions, ScrollView, Animated, Platform,
} from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import styles, {
  pink2green, grey2yellow, pink2yellow, white2lgrey, white2green,
} from '../constants/DarkStyles';

export default function NewsTab() {
  const scrollX = new Animated.Value(0);

  return (

    <View style={styles.background}>

      <View style={styles.statusBar} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: Platform.OS === 'android' ? 68 : 68, marginTop: 30 }}
      >

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentInset={{ left: 50, right: 50 }}
          snapToAlignment="center"
          snapToInterval={Dimensions.get('window').width}
          disableIntervalMomentum
          directionalLockEnabled
          pagingEnabled
          scrollEventThrottle={14}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          style={{
            width: Dimensions.get('window').width, paddingBottom: 20,
          }}
        >
          <Pressable
            style={styles.eventTab}
          >
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5,
            }}
            >
              <Text style={styles.eventHeader}>Event</Text>
              <Text style={styles.eventDate}>00/00/00</Text>
            </View>
            <View
              style={{
                borderBottomColor: pink2green,
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
                color={grey2yellow}
                style={{ alignSelf: 'center' }}
              />
            </View>
          </Pressable>

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
                borderBottomColor: pink2green,
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
                color={grey2yellow}
                style={{ alignSelf: 'center' }}
              />
            </View>
          </Pressable>
          {/* </DropShadow> */}

          {/* <DropShadow style={styles.shadowProp}> */}
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
                borderBottomColor: pink2green,
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
                color={grey2yellow}
                style={{ alignSelf: 'center' }}
              />
            </View>
          </Pressable>
          {/* </DropShadow> */}
        </Animated.ScrollView>

        <View style={{
          borderWidth: 2,
          borderColor: white2green,
          borderRadius: 10,
          padding: 5,
          width: 115,
          alignSelf: 'center',
        }}
        >
          <RNAnimatedScrollIndicators
            numberOfCards={3}
            scrollWidth={Dimensions.get('window').width}
            activeColor={pink2yellow}
            inActiveColor={white2lgrey}
            scrollAnimatedValue={scrollX}
            style={{

            }}
          />
        </View>

        {/* <DropShadow style={styles.shadowProp}> */}
        <Pressable style={styles.newsTab}>
          <Text style={styles.newsHeader}>Breaking News!</Text>

          <View
            style={{
              borderBottomColor: pink2green,
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
              color={grey2yellow}
              style={{ alignSelf: 'center' }}
            />
          </View>
        </Pressable>
        {/* </DropShadow> */}

        {/* <DropShadow style={styles.shadowProp}> */}
        <Pressable style={styles.newsTab}>
          <Text style={styles.newsHeader}>Breaking News!</Text>

          <View
            style={{
              borderBottomColor: pink2green,
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
              color={grey2yellow}
              style={{ alignSelf: 'center' }}
            />
          </View>
        </Pressable>
        {/* </DropShadow> */}

        {/* <DropShadow style={styles.shadowProp}> */}
        <Pressable style={styles.newsTab}>
          <Text style={styles.newsHeader}>Breaking News!</Text>

          <View
            style={{
              borderBottomColor: pink2green,
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
              color={grey2yellow}
              style={{ alignSelf: 'center' }}
            />
          </View>
        </Pressable>
        {/* </DropShadow> */}
      </ScrollView>
    </View>
  );
}
