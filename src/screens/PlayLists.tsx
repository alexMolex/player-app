import { FlatList, Text } from 'react-native'
import React from 'react'
import { useUnit } from 'effector-react'
import PlaylistItem from '@/src/ui/PlaylistItem'
import PressableLink from '@/src/ui/PressableLink'
import { tabsScreenRoutes } from '@/src/routes'
import { setCurrentAlbum } from '@/src/store/audioAssetsStore'
import { $combinedPlaylists } from '@/src/store/playlistsStore'

const PlayLists = () => {
  const combinedPlaylists = useUnit($combinedPlaylists)

  const combinedPlaylistsEntries = Object.entries(combinedPlaylists)

  if (combinedPlaylistsEntries.length === 0) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={combinedPlaylistsEntries}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => {
        const [albumId, album] = item
        return (
          <PressableLink
            pathname={tabsScreenRoutes.playlists.children['[id]'].pathName}
            params={{ id: albumId, playlistTitle: album.name }}
            onPress={() =>
              setCurrentAlbum({
                albumId: albumId,
                name: album.name,
                assets: album.list,
              })
            }
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
    />
  )
}

export default PlayLists
