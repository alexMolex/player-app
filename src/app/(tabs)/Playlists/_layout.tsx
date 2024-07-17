import { useUnit } from 'effector-react'
import { Stack } from 'expo-router'
import { tabsScreenRoutes } from '@/src/routes'
import { $currentPlaylist } from '@/src/store/audioPlaylistsStore'

const playlistsChildrenRoutes = tabsScreenRoutes.playlists.children

const PlaylistsScreenLayout = () => {
  const { name } = useUnit($currentPlaylist)

  return (
    <Stack>
      <Stack.Screen
        name={playlistsChildrenRoutes.index.name}
        options={{
          headerTitle: 'Playlists',
        }}
      />
      <Stack.Screen
        name={playlistsChildrenRoutes['[id]'].name}
        options={{
          headerTitle: name,
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}

export default PlaylistsScreenLayout
