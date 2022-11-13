import {
  View, Text, ScrollView, Pressable, Image, Dimensions, Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import styles, {
  grey2yellow, pink2yellow, pink2green, white2green,
} from '../constants/Styles';
import PawPostComment from './PawPostComment';

const miso = require('../../assets/miso.jpg');

export default function PawPostPost() {
  const [isPicVisible, setPicVisible] = useState(false);
  const togglePic = () => {
    setPicVisible(!isPicVisible);
  };

  return (
    <View>
      <Pressable style={[styles.picContainer, { height: 400 }]} onPress={togglePic}>
        <Image
          style={styles.picImage}
          source={miso}
        />
        <View
          style={styles.picBottomBand}
        />
        <Pressable>
          <Feather
            name="heart"
            size={24}
            color={pink2yellow}
            style={styles.likeLoc1}
          />

        </Pressable>
        <Pressable style={styles.ppProfileNameNode}>
          <Text style={styles.picHeader2}>@user-name</Text>
        </Pressable>
        <Image
          style={styles.ppProfileImage}
          source={miso}
        />
        <Text style={[styles.picDescription, { left: 2, top: 290 }]}>Descriptive Text</Text>
        <View
          style={{
            borderBottomColor: pink2green,
            borderBottomWidth: 1,
            borderRadius: 50,
            top: 330,
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
        <Text style={[styles.picTag, { left: 2, top: 325 }]}>Tags</Text>
      </Pressable>

      {/* </DropShadow> */}
      <Modal
        isVisible={isPicVisible}
        onBackdropPress={() => isPicVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop={false}
        style={styles.picsModal}
      >
        <View>
          <Image
            style={styles.inspicImage}
            source={miso}
          />
          <View
            style={styles.inspicBottomBand}
          />
          <View style={styles.inspicContainer} />
          <Pressable>
            <Feather
              name="heart"
              size={24}
              color={pink2yellow}
              style={styles.likeLoc2}
            />

          </Pressable>
          <Pressable style={styles.insppProfileNameNode}>
            <Text style={styles.inspicHeader2}>@user-name</Text>
          </Pressable>
          <Image
            style={styles.insppProfileImage}
            source={miso}
          />
          <Text style={[styles.inspicDescription, { left: -8, top: (Dimensions.get('window').width - 20) }]}>Descriptive Text</Text>
          <View
            style={{
              borderBottomColor: pink2green,
              borderBottomWidth: 1,
              borderRadius: 50,
              top: (Dimensions.get('window').width + 20),
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
          <Text style={[styles.inspicTag, { left: -8, top: (Dimensions.get('window').width + 15) }]}>Tags</Text>
          <Pressable
            onPress={togglePic}
            style={{ alignSelf: 'flex-start', zIndex: 45, top: -60 }}
          >
            <Feather
              name="chevron-left"
              size={30}
              color={grey2yellow}
              style={styles.exitPicButton}
            />

          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 72, marginBottom: 100 }}>
          <View
            style={{
              borderColor: white2green,
              backgroundColor: white2green,
              borderRadius: 50,
              width: 6,
              height: Platform.OS === 'android' ? (Dimensions.get('window').width - 90) : (Dimensions.get('window').width - 125),
              marginTop: Dimensions.get('window').width,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 20,
            }}
          />
          <ScrollView style={{ marginTop: Dimensions.get('window').width - 10 }}>

            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />
            <PawPostComment />

          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
