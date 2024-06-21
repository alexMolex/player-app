import { sample, createEvent, createStore, createEffect } from 'effector'
import { Audio } from 'expo-av'
import type { AVPlaybackStatusSuccess } from 'expo-av'
import { Asset } from 'expo-media-library'
import { showErrorNotificationFx } from '../notification'
import type { TAudioControl, TAudioQueue, TAudioPlaybackStatus } from './types'
import audioAssetsStore from '../audioAssetsStore'

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

const clearRequestAudioPlaybackTimeout = () => {
  const timeoutRequestAudioPlaybackStatisId =
    audioPlaybackStatuslStore.getState().timeoutId

  if (timeoutRequestAudioPlaybackStatisId !== null) {
    clearTimeout(timeoutRequestAudioPlaybackStatisId)
  }
}

export const playSoundFx = createEffect(async (song: Asset) => {
  const sound = new Audio.Sound()

  clearRequestAudioPlaybackTimeout()

  try {
    await audioSoundStore.getState().sound.unloadAsync()

    sound.setOnPlaybackStatusUpdate((status) => {
      updateonPlaybackStatust(status as AVPlaybackStatusSuccess)
    })

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    })

    await sound.loadAsync({ uri: song.uri })

    await getAudioPlaybackStatusFx()

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
  clearRequestAudioPlaybackTimeout()

  return audioSoundStore.getState().sound.pauseAsync()
})

export const playCurrentSoundFx = createEffect(async () => {
  getAudioPlaybackStatusFx()

  return audioSoundStore.getState().sound.playAsync()
})

export const setPositionFx = createEffect(async (positionMillis: number) => {
  return audioSoundStore.getState().sound.setPositionAsync(positionMillis)
})

export const getAudioPlaybackStatusFx = createEffect(async () => {
  return audioSoundStore.getState().sound.getStatusAsync()
})

const updateonPlaybackStatust = createEvent<AVPlaybackStatusSuccess>()

export const audioPlaybackStatuslStore = createStore<TAudioPlaybackStatus>({
  status: undefined,
  timeoutId: null,
}).on(updateonPlaybackStatust, (state, status) => {
  return { ...state, status }
})

const addAudioToQueue = createEvent<Asset>()
const setCurrentAsset = createEvent<Asset>()
export const toggleRandomMode = createEvent()

export const audioSoundStore = createStore<TAudioControl>({
  sound: new Audio.Sound(),
})

export const audioQueueStore = createStore<TAudioQueue>({
  randomQueue: [],
  currentAsset: null,
  isRandomMode: false,
})
  .on(addAudioToQueue, (state, asset) => {
    return { ...state, randomQueue: [...state.randomQueue, asset] }
  })
  .on(setCurrentAsset, (state, asset) => {
    return { ...state, currentAsset: asset }
  })
  .on(toggleRandomMode, (state) => {
    return { ...state, isRandomMode: !state.isRandomMode }
  })

playSoundFx.watch(setCurrentAsset)

sample({
  clock: playSoundFx.done,
  target: audioSoundStore,
  fn: ({ result: sound }) => {
    return { sound }
  },
})

sample({
  clock: getAudioPlaybackStatusFx.done,
  target: audioPlaybackStatuslStore,
  fn: ({ result }) => {
    const timeoutId = setTimeout(() => {
      getAudioPlaybackStatusFx()
    }, 5000)

    return { status: result as AVPlaybackStatusSuccess, timeoutId }
  },
})

sample({
  clock: playSoundFx.done,
  filter: () => {
    return audioQueueStore.getState().isRandomMode
  },
  fn: ({ params }) => {
    addAudioToQueue(params)
  },
})

sample({
  clock: playSoundFx.failData,
  target: showErrorNotificationFx,
})
