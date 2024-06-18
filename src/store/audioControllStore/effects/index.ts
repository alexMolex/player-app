import { createEffect } from 'effector'
import { Audio } from 'expo-av'
import { Asset } from 'expo-media-library'
import { audioSoundStore, audioQueueStore } from '..'
import audioAssetsStore from '../../audioAssetsStore'

const getAssetPosition = () => {
  const currentAsset = audioQueueStore.getState().currentAsset
  const currentAlbum = audioAssetsStore.getState().currentAlbum

  const currentAssetIndex =
    currentAsset !== null ? currentAlbum.indexOf(currentAsset) : -1

  const isFoundAsset = currentAssetIndex !== -1
  const isLastAsset = currentAssetIndex === currentAlbum.length - 1
  const isFirstAsset = currentAssetIndex === 0
  const nextAsset = currentAlbum[currentAssetIndex + 1]
  const previousAsset = currentAlbum[currentAssetIndex - 1]

  return {
    isFoundAsset,
    nextAsset,
    previousAsset,
    isFirstAsset,
    isLastAsset,
  }
}

export const playSoundFx = createEffect(async (song: Asset) => {
  const sound = new Audio.Sound()

  try {
    await audioSoundStore.getState().sound.unloadAsync()

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    })

    await sound.loadAsync({ uri: song.uri })

    await sound.playAsync()
  } catch (error) {
    throw error
  }

  return sound
})

export const playNextSoundFx = createEffect(async () => {
  const { isFoundAsset, nextAsset, isLastAsset } = getAssetPosition()

  if (isFoundAsset && !isLastAsset) {
    return playSoundFx(nextAsset)
  }

  if (!isFoundAsset) {
    throw new Error('Asset not found')
  }

  throw new Error(
    'The next sound cannot be played because it is the last asset'
  )
})

export const playPreviousSoundFx = createEffect(async () => {
  const { isFoundAsset, previousAsset, isFirstAsset } = getAssetPosition()

  if (isFoundAsset && !isFirstAsset) {
    return playSoundFx(previousAsset)
  }

  if (!isFoundAsset) {
    throw new Error('Asset not found')
  }

  throw new Error(
    'The previous sound cannot be played because it is the first asset'
  )
})

export const pauseCurrentSoundFx = createEffect(async () => {
  return audioSoundStore.getState().sound.pauseAsync()
})

export const playCurrentSoundFx = createEffect(async () => {
  return audioSoundStore.getState().sound.playAsync()
})

export const setPositionFx = createEffect(async (positionMillis: number) => {
  return audioSoundStore.getState().sound.setPositionAsync(positionMillis)
})
