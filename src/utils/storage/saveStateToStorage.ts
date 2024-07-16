import AsyncStorage from '@react-native-async-storage/async-storage'

const saveStateToStorage = async <T>(state: T, storeName: string) => {
  try {
    const serializedState = JSON.stringify(state)

    await AsyncStorage.setItem(storeName, serializedState)
  } catch (error) {
    console.error(`Ошибка сохранения в AsyncStorage ${storeName}:`, error)

    return undefined
  }
}

export default saveStateToStorage
