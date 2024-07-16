import AsyncStorage from '@react-native-async-storage/async-storage'

const getStateFromStorage = async <T>(
  storeName: string
): Promise<Awaited<T> | undefined> => {
  const serializedState = await AsyncStorage.getItem(storeName)

  if (serializedState === null) {
    return undefined
  }

  return JSON.parse(serializedState)
}

export default getStateFromStorage
