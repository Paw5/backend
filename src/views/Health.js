import {
  Pressable, View, Image, Text, Dimensions, ScrollView, StyleSheet,
} from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const StatusBarHeight = getStatusBarHeight();

const miso = require('../../assets/miso.jpg');

const styles = StyleSheet.create({
  petCard: {
    height: 200,
    width: 160,
    backgroundColor: 'white',
    color: '#333333',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    marginTop: 0,
    marginBottom: -30,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 25,
    elevation: 24,
    shadowColor: '#000',
    overflow: 'hidden',
  },

  petHeader: {
    fontFamily: 'arial',
    fontSize: 25,
    fontWeight: '300',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 10,
  },

  healthContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: (Dimensions.get('window').width - 20),
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 25,
    overflow: 'hidden',
    alignContent: 'center',
    height: 300,
    marginBottom: 20,
  },
});

export default function HealthTab() {
  return (
    <View style={{
      backgroundColor: '#69A297', flex: 1,
    }}
    >

      <View style={{ backgroundColor: '#e0777d', height: StatusBarHeight }} />

      <ScrollView contentInset={{ bottom: 50 }} style={{ marginTop: 20 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={200}
          pagingEnabled
          contentInset={{ left: 100, right: 100 }}
          style={{
            width: Dimensions.get('window').width, paddingBottom: 60,
          }}
        >

          <Pressable style={styles.petCard}>
            <Image
              style={{
                height: 130, width: 130, borderRadius: 100,
              }}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
          <Pressable style={styles.petCard}>
            <Image
              style={{
                height: 130, width: 130, borderRadius: 100,
              }}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
          <Pressable style={styles.petCard}>
            <Image
              style={{
                height: 130, width: 130, borderRadius: 100,
              }}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
          <Pressable style={styles.petCard}>
            <Image
              style={{
                height: 130, width: 130, borderRadius: 100,
              }}
              source={miso}
            />
            <Text style={styles.petHeader}>Miso</Text>

          </Pressable>
        </ScrollView>

        <Pressable style={styles.healthContainer} />
        <Pressable style={styles.healthContainer} />
        <Pressable style={styles.healthContainer} />
      </ScrollView>
    </View>
  );
}
