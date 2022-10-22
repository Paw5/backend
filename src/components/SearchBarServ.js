import React, { useState } from 'react';
import {
  StyleSheet, TextInput, View, Text, Pressable, Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '90%',
    justifyContent: 'space-between',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    marginRight: 40,
    width: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 150,
    elevation: 24,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
  filters: {
    position: 'absolute',
    marginLeft: 50,
    height: 45,
    width: 45,
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.5,
    right: -5,
    elevation: 20,
  },
  modalView: {
    margin: 15,
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 45,
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 24,
  },
});

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
