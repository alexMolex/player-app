import { createEffect } from 'effector'
import { Audio } from 'expo-av'
import audioControllStore from '..'

const playSoundFx = createEffect(async (uri: string) => {
  const sound = new Audio.Sound()

  try {
    await audioControllStore.getState().sound.unloadAsync()

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    })

    await sound.loadAsync({ uri })

    await sound.playAsync()
  } catch (error) {
    throw error
  }

  return sound
})

export default playSoundFx
