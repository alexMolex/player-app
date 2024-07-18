import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

type TProps = {
  cover: ReturnType<NodeRequire>
  title: string
  tracksCount: number
}

const PlaylistItem: React.FC<TProps> = ({ cover, title, tracksCount }) => {
  return (
    <View style={styles.container}>
      <Image source={cover} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.tracksCount} numberOfLines={1}>
          {tracksCount} tracks
        </Text>
      </View>
      <Entypo name="chevron-right" size={24} color="black" />
    </View>
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
  cover: {
    width: 80,
    height: 80,
    backgroundColor: 'black',
    borderRadius: 6,
  },
  tracksCount: {
    fontSize: 14,
    color: 'grey',
  },
})

export default PlaylistItem
