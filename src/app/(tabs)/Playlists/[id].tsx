import { FlatList, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useLocalSearchParams } from 'expo-router'
import {
  deviceAudioAlbumsCollection,
  setCurrentAlbum,
} from '@/src/store/audioAssetsStore'
import AudioItem from './AudioItem'

const PlayList = () => {
  const [deviceAudioAlbums] = useUnit([deviceAudioAlbumsCollection])
  const { id } = useLocalSearchParams<{ id: string }>()

  const isExistAlbum = id && deviceAudioAlbums[id]

  useEffect(() => {
    if (isExistAlbum) {
      setCurrentAlbum(deviceAudioAlbums[id].list)
    }

    // return () => {
    //   setCurrentAlbum([])
    // }
  }, [deviceAudioAlbums, id, isExistAlbum])

  if (!isExistAlbum) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={deviceAudioAlbums[id].list}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <AudioItem list={deviceAudioAlbums[id].list} song={item} />
      )}
    />
  )
}

export default PlayList
