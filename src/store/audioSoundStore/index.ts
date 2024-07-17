import { createEffect, createStore, sample } from 'effector'
import { Audio, InterruptionModeAndroid } from 'expo-av'
import { Asset } from 'expo-media-library'
import { showErrorNotificationFx } from '../notification'
import { setCurrentAsset } from '../audioQueueStore'
import { TAudioControl } from './types'

export const prepareSoundFx = createEffect(async (asset: Asset) => {
  const sound = new Audio.Sound()

  try {
    await $audioSound.getState().sound.unloadAsync()

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    })

    await sound.loadAsync({ uri: asset.uri })
  } catch (error) {
    throw error
  }

  return sound
})

export const $audioSound = createStore<TAudioControl>({
  sound: new Audio.Sound(),
})

prepareSoundFx.watch(setCurrentAsset)

sample({
  clock: prepareSoundFx.done,
  target: $audioSound,
  fn: ({ result: sound }) => {
    return { sound }
  },
})

sample({
  clock: prepareSoundFx.failData,
  target: showErrorNotificationFx,
})
