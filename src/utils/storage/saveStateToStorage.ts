import AsyncStorage from '@react-native-async-storage/async-storage'

const saveStateToStorage = async <T>(state: T, storeName: string) => {
  const serializedState = JSON.stringify(state)

  return AsyncStorage.setItem(storeName, serializedState)
}

export default saveStateToStorage
