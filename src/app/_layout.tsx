import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
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
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" />
		</Stack>
	)
}

export default App
