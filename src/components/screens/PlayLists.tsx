import { FlatList, Text } from 'react-native'
import React from 'react'
import { useUnit } from 'effector-react'
import PlaylistItem from '@/src/ui/PlaylistItem'
import PressableLink from '@/src/ui/PressableLink'
import { tabsScreenRoutes } from '@/src/routes'
import {
  $combinedPlaylists,
  setCurrentPlaylist,
} from '@/src/store/audioPlaylistsStore'
import AddPlaylist from '../modals/AddPlaylist'

const PlayLists = () => {
  const combinedPlaylists = useUnit($combinedPlaylists)

  const combinedPlaylistsEntries = Object.entries(combinedPlaylists)

  if (combinedPlaylistsEntries.length === 0) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={combinedPlaylistsEntries}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={<AddPlaylist />}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => {
        const [albumId, album] = item
        return (
          <PressableLink
            pathname={tabsScreenRoutes.playlists.children['[id]'].pathName}
            params={{ id: albumId, playlistTitle: album.name }}
            onPress={() => {
              setCurrentPlaylist({
                albumId: albumId,
                name: album.name,
                assets: album.list,
              })
            }}
          >
            <PlaylistItem
              cover={require('@/src/assets/images/react-logo.png')}
              title={album.name}
              tracksCount={album.list.length}
            />
          </PressableLink>
        )
      }}
    />
  )
}

export default PlayLists
