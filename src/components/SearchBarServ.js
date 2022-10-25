import React, { useState } from 'react';
import {
  TextInput, View, Text, Pressable, Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../constants/Styles';

export default function SearchBar(searchQuery) {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>Filters Will be Here</Text>
          <Pressable
            style={[styles.filters]}
            onPress={() => setModalVisible(!isModalVisible)}
          >
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
      <View
        style={styles.searchBar}
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 10, alignItems: 'center' }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchQuery}
        />
      </View>
      <View style={styles.filters} />
      <Pressable style={styles.filters} onPress={() => setModalVisible(true)}>
        <Feather
          name="filter"
          size={20}
          color="black"
          style={{ justifyContent: 'center' }}
        />
      </Pressable>
    </View>

  );
}
