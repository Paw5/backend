/* eslint-disable global-require */
import {
  View, ScrollView, Image, Text, Pressable, Platform,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import SearchBar from '../components/SearchBarServ';
import styles, { pawPink, pawGreen, pawGrey } from '../constants/Styles';

const StatusBarHeight = getStatusBarHeight();
const miso = require('../../assets/miso.jpg');

export default function PMs() {
  /* toggle message section modal */
  const [isMessageVisible, setMessageVisible] = useState(false);
  const toggleMessage = () => {
    setMessageVisible(!isMessageVisible);
  };

  const scrollViewRef = useRef();

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

      <ScrollView
        contentInset={{ bottom: 160 }}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: Platform.OS === 'android' ? 170 : 0 }}
      >
        <Pressable onPress={toggleMessage} style={styles.pmUserInteraction}>
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
        </Pressable>

        <Pressable onPress={toggleMessage} style={styles.pmUserInteraction}>
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
        </Pressable>

        <Pressable onPress={toggleMessage} style={styles.pmUserInteraction}>
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
        </Pressable>

        <Pressable onPress={toggleMessage} style={styles.pmUserInteraction}>
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
        </Pressable>
      </ScrollView>

      <Modal
        isVisible={isMessageVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.PMModal}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable
            onPress={toggleMessage}
            style={{ alignSelf: 'flex-start', flex: 1.5 }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={pawGrey}
              style={styles.pmExitButton}
            />

          </Pressable>

          <View style={styles.messageTitle}>
            <Text style={styles.userTitle}>Username</Text>

            <Image
              style={styles.messageProfileIcon}
              source={miso}
            />
          </View>

        </View>

        <ScrollView
          contentInset={{ top: 10 }}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >

          <View style={styles.messageRecieve}>
            <Text style={styles.messageContents}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>

          <View style={styles.messageSent}>
            <Text style={styles.messageContents}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>

          <View style={styles.messageRecieve}>
            <Text style={styles.messageContents}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>

        </ScrollView>

        <View style={styles.replyBar}>
          <Text style={styles.replyContents}>
            Reply here
          </Text>

          <Pressable>
            <Feather
              name="send"
              size={25}
              color="white"
              style={styles.sendButton}
            />
          </Pressable>
        </View>

      </Modal>

    </View>
  );
}
