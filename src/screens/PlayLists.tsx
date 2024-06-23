import { FlatList, Text } from 'react-native'
import React from 'react'
import { useUnit } from 'effector-react'
import PlaylistItem from '@/src/ui/PlaylistItem'
import PressableLink from '@/src/ui/PressableLink'
import { tabsScreenRoutes } from '@/src/routes'
import { deviceAudioAlbumsCollection } from '@/src/store/audioAssetsStore'
import { setCurrentAlbum } from '@/src/store/audioAssetsStore'

const PlayLists = () => {
  const [deviceAudioAlbums] = useUnit([deviceAudioAlbumsCollection])

  const deviceAudioAlbumsList = Object.entries(deviceAudioAlbums)

  if (deviceAudioAlbumsList.length === 0) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={deviceAudioAlbumsList}
      renderItem={({ item }) => {
        const [albumId, album] = item
        return (
          <PressableLink
            pathname={tabsScreenRoutes.playlists.children['[id]'].pathName}
            params={{ id: albumId, playlistTitle: album.name }}
            onPress={() => setCurrentAlbum(album.list)}
          >
            <PlaylistItem
              cover={require('@/src/assets/images/react-logo.png')}
              title={album.name}
              tracksCount={album.list.length}
              onMenuPress={() => console.log('Pressed')}
            />
          </PressableLink>
        )
      }}
      keyExtractor={(item) => item[0]}
    />
  )
}

export default PlayLists
