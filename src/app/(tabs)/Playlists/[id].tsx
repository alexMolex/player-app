import { FlatList, Text } from 'react-native'
import React from 'react'
import { useUnit } from 'effector-react'
import { useLocalSearchParams } from 'expo-router'
import { deviceAudioAlbumsCollection } from '@/src/store/audioAssestStore'
import AudioItem from './AudioItem'

const PlayList = () => {
  const [deviceAudioAlbums] = useUnit([deviceAudioAlbumsCollection])
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id || !deviceAudioAlbums[id]) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={deviceAudioAlbums[id].list}
      renderItem={({ item }) => <AudioItem song={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}

export default PlayList
