import { FlatList, Text } from 'react-native'
import React from 'react'
import { useUnit } from 'effector-react'
import {
  $deviceAudioAlbumsCollection,
  $audioAssets,
} from '@/src/store/audioAssetsStore'
import AudioItem from './AudioItem'

const PlayList = () => {
  const [
    deviceAudioAlbums,
    {
      currentAlbum: { albumId },
    },
  ] = useUnit([$deviceAudioAlbumsCollection, $audioAssets])

  const isExistAlbum = albumId && deviceAudioAlbums[albumId]

  if (!isExistAlbum) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={deviceAudioAlbums[albumId].list}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <AudioItem song={item} />}
    />
  )
}

export default PlayList
