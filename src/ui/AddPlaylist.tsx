import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const AddPlaylist: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.square}>
          <Text style={styles.icon}>+</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            Новый плейлист
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  square: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    color: 'white',
  },
})

export default AddPlaylist
