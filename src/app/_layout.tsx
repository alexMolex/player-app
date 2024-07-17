import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { rootLayoutRoutes } from '@/src/routes'
import useRequestAudioFiles from '@/src/store/audioAssetsStore/hooks/useRequestAudioFiles'
import { default as useSyncStoreWithStoragePlayLists } from '@/src/store/audioPlaylistsStore/hooks/useSyncStoreWithStorage'
import { default as useSyncStoreWithStorageAudioQueue } from '@/src/store/audioQueueStore/hooks/useSyncStoreWithStorage'

const App = () => {
  useRequestAudioFiles()
  useSyncStoreWithStorageAudioQueue()
  useSyncStoreWithStoragePlayLists()

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <RootLayout />
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name={rootLayoutRoutes.tabsScreen.name}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={rootLayoutRoutes.notFoundScreen.name} />
      <Stack.Screen
        name={rootLayoutRoutes.playerModal.name}
        options={{
          presentation: 'modal',
          gestureDirection: 'vertical',
          gestureEnabled: true,
          animation: 'slide_from_bottom',
          animationDuration: 400,
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default App
