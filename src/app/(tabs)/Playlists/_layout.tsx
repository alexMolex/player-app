import { Stack } from 'expo-router'
import { useGlobalSearchParams } from 'expo-router'
import { tabsScreenRoutes } from '@/src/routes'

const playlistsChildrenRoutes = tabsScreenRoutes.playlists.children

const PlaylistsScreenLayout = () => {
  const { playlistTitle } = useGlobalSearchParams<{
    playlistTitle?: string
  }>()

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
          headerTitle: playlistTitle,
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}

export default PlaylistsScreenLayout
