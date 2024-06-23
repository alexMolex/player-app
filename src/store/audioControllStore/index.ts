import { sample, createEvent, createStore, createEffect } from 'effector'
import { Audio } from 'expo-av'
import type { AVPlaybackStatusSuccess } from 'expo-av'
import { Asset } from 'expo-media-library'
import { msPerSecond } from '@/src/utils/time/constants'
import { showErrorNotificationFx } from '../notification'
import type { TAudioControl, TAudioQueue, TAudioPlaybackStatus } from './types'
import $audioAssets from '../audioAssetsStore'

const getAssetPosition = () => {
  const currentAsset = $audioQueue.getState().currentAsset
  const currentAlbum = $audioAssets.getState().currentAlbum

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

  sound.setOnPlaybackStatusUpdate((status) => {
    updateonPlaybackStatust(status as AVPlaybackStatusSuccess)
  })

  try {
    await $audioSound.getState().sound.unloadAsync()

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    })

    await sound.loadAsync({ uri: song.uri })

    if ($audioPlaybackStatus.getState().isPlaying) {
      await sound.playAsync()

      runTimer()
    }
  } catch (error) {
    throw error
  }

  return sound
})

export const playNextSoundFx = createEffect(async () => {
  const { isFoundAsset, nextAsset, isLastAsset } = getAssetPosition()

  resetTimer()

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

  resetTimer()

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
  setIsPlaying(false)
  stopTimer()

  return $audioSound.getState().sound.pauseAsync()
})

export const playCurrentSoundFx = createEffect(async () => {
  setIsPlaying(true)
  runTimer()

  return $audioSound.getState().sound.playAsync()
})

export const setPositionFx = createEffect(async (positionMillis: number) => {
  const durationMillis = $audioPlaybackStatus.getState().status?.durationMillis

  if (durationMillis) {
    runTimer()

    return $audioSound
      .getState()
      .sound.setPositionAsync(positionMillis * durationMillis)
  }

  throw new Error('Status is not exist in $audioPlaybackStatus')
})

const updateonPlaybackStatust = createEvent<AVPlaybackStatusSuccess>()
const runTimer = createEvent()
const resetTimer = createEvent()
export const stopTimer = createEvent()
export const setTimeInMs = createEvent<number>()
export const setIsPlaying = createEvent<boolean>()

export const $audioPlaybackStatus = createStore<TAudioPlaybackStatus>({
  status: undefined,
  timeoutMs: 0,
  isPlaying: true,
  isRunningTimer: false,
  timerId: null,
})
  .on(updateonPlaybackStatust, (state, status) => {
    return {
      ...state,
      status,
      timeoutMs: status.positionMillis ?? state.timeoutMs,
    }
  })
  .on(setIsPlaying, (state, isPlaying) => {
    return {
      ...state,
      isPlaying,
    }
  })
  .on(setTimeInMs, (state, value) => {
    const durationMillis = state.status?.durationMillis ?? 0
    const position = durationMillis * value

    // -100 so that the song does not switch when we set the time to the end
    const timeoutMs = Math.min(position, durationMillis - 100)

    return { ...state, timeoutMs }
  })
  .on(runTimer, (state) => {
    if (!state.isPlaying) {
      return state
    }

    if (!state.isRunningTimer) {
      const timerId = setInterval(runTimer, msPerSecond)

      return { ...state, timerId, isRunningTimer: true }
    }

    return { ...state, timeoutMs: state.timeoutMs + msPerSecond }
  })
  .on(stopTimer, (state) => {
    if (state.timerId !== null) {
      clearInterval(state.timerId)
    }

    return { ...state, timeoutId: null, isRunningTimer: false }
  })
  .on(resetTimer, (state) => {
    if (state.timerId !== null) {
      clearInterval(state.timerId)
    }

    return { ...state, timeoutMs: 0, timeoutId: null, isRunningTimer: false }
  })

$audioPlaybackStatus.watch(({ status, timeoutMs }) => {
  if (status?.durationMillis && status.durationMillis <= timeoutMs) {
    playNextSoundFx()
  }
})

export const $audioPosision = $audioPlaybackStatus.map((state) => {
  const audioPosition = state.status?.durationMillis
    ? state.timeoutMs / state.status.durationMillis
    : 0

  return audioPosition
})

const addAudioToQueue = createEvent<Asset>()
const setCurrentAsset = createEvent<Asset>()
export const toggleRandomMode = createEvent()

export const $audioSound = createStore<TAudioControl>({
  sound: new Audio.Sound(),
})

export const $audioQueue = createStore<TAudioQueue>({
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
  target: $audioSound,
  fn: ({ result: sound }) => {
    return { sound }
  },
})

sample({
  clock: playSoundFx.done,
  filter: () => {
    return $audioQueue.getState().isRandomMode
  },
  fn: ({ params }) => {
    addAudioToQueue(params)
  },
})

sample({
  clock: playSoundFx.failData,
  target: showErrorNotificationFx,
})
