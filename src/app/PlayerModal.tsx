import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MusicPlayer: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Воспроизведение музыки...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MusicPlayer
