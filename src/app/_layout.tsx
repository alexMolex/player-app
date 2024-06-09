import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useUnit } from 'effector-react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { rootLayoutRoutes } from '@/src/routes'
import useRequestAudioFiles from '@/src/hooks/useRequestAudioFiles'
import audioAssestStore from '@/src/store/userMediaStore/audioAssestStore'

const App = () => {
  useRequestAudioFiles()
  const audioAssest = useUnit(audioAssestStore)
  console.log('🚀 ~ App ~ audioAssest:', audioAssest.totalCount)

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
