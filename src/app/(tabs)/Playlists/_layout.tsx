import { Stack } from 'expo-router'
import { useGlobalSearchParams } from 'expo-router'

const PlaylistsScreenLayout = () => {
  const { playlistTitle } = useGlobalSearchParams<{
    playlistTitle?: string
  }>()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Playlists',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: playlistTitle,
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}

export default PlaylistsScreenLayout
