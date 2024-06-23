import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Menu from './Menu'
import Avatar from './Avatar'

type TProps = {
  cover: ReturnType<NodeRequire>
  title: string
  tracksCount: number
  onMenuPress: () => void
}

const PlaylistItem: React.FC<TProps> = ({
  cover,
  title,
  tracksCount,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <Avatar avatarUrl={cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.tracksCount} numberOfLines={1}>
          {tracksCount} tracks
        </Text>
      </View>
      <Menu onMenuPress={onMenuPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  tracksCount: {
    fontSize: 14,
    color: 'grey',
  },
})

export default PlaylistItem
