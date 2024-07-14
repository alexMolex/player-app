import { Stack } from 'expo-router'
import { tabsScreenRoutes } from '@/src/routes'
import { $audioAssets } from '@/src/store/audioAssetsStore'

import { useUnit } from 'effector-react'

const playlistsChildrenRoutes = tabsScreenRoutes.playlists.children

const PlaylistsScreenLayout = () => {
  const { currentAlbum } = useUnit($audioAssets)

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
          headerTitle: currentAlbum.name,
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}

export default PlaylistsScreenLayout
