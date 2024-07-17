import { FlatList, Text } from 'react-native'
import React from 'react'
import { useUnit } from 'effector-react'
import {
  $audioAssets,
  $combinedPlaylists,
} from '@/src/store/audioPlaylistsStore'
import AudioItem from './AudioItem'

const PlayList = () => {
  const [
    combinedPlaylists,
    {
      currentAlbum: { albumId },
    },
  ] = useUnit([$combinedPlaylists, $audioAssets])

  const isExistAlbum = albumId && combinedPlaylists[albumId]

  if (!isExistAlbum) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={combinedPlaylists[albumId].list}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <AudioItem song={item} />}
    />
  )
}

export default PlayList
