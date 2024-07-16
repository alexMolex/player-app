import AsyncStorage from '@react-native-async-storage/async-storage'

const getStateFromStorage = async <T>(
  storeName: string
): Promise<Awaited<T> | undefined> => {
  try {
    const serializedState = await AsyncStorage.getItem(storeName)

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (error) {
    console.error(`Ошибка чтения из AsyncStorage ${storeName}:`, error)

    return undefined
  }
}

export default getStateFromStorage
