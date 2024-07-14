import { sample, createEvent, createStore, createEffect } from 'effector'
import { Audio, InterruptionModeAndroid } from 'expo-av'
import type { AVPlaybackStatusSuccess } from 'expo-av'
import { Asset } from 'expo-media-library'
import { msPerSecond } from '@/src/utils/time/constants'
import { showErrorNotificationFx } from '../notification'
import type { TAudioControl, TAudioQueue, TAudioPlaybackStatus } from './types'
import $audioAssets from '../audioAssetsStore'
import shuffleArrayExceptFirst from '@/src/utils/array/shuffleArrayExceptFirst'

const getAssetPosition = () => {
  const { currentAsset, queue } = $audioQueue.getState()

  const currentAssetIndex =
    currentAsset !== null ? queue.indexOf(currentAsset) : -1

  const isFoundAsset = currentAssetIndex !== -1
  const isLastAsset = currentAssetIndex === queue.length - 1
  const isFirstAsset = currentAssetIndex === 0
  const nextAsset = queue[currentAssetIndex + 1]
  const previousAsset = queue[currentAssetIndex - 1]

  return {
    isFoundAsset,
    nextAsset,
    previousAsset,
    isFirstAsset,
    isLastAsset,
  }
}

const prepareSoundFx = createEffect(async (asset: Asset) => {
  const sound = new Audio.Sound()

  sound.setOnPlaybackStatusUpdate((status) => {
    updateonPlaybackStatust(status as AVPlaybackStatusSuccess)
  })

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

export const playSoundFx = createEffect(async (asset: Asset) => {
  try {
    const sound = await prepareSoundFx(asset)

    await sound.playAsync()
    resetTimer()
    runTimerAndPlay()
  } catch (error) {
    throw error
  }
})

const playSoundWhenIsPlayingFx = createEffect(async (asset: Asset) => {
  try {
    const sound = await prepareSoundFx(asset)

    if ($audioPlaybackStatus.getState().isPlaying) {
      await sound.playAsync()
      resetTimer()
      runTimerWhenIsPlaying()
    }
  } catch (error) {
    throw error
  }
})

export const playNextSoundFx = createEffect(async () => {
  const { isFoundAsset, nextAsset, isLastAsset } = getAssetPosition()

  if (isFoundAsset && !isLastAsset) {
    return playSoundWhenIsPlayingFx(nextAsset)
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
    return playSoundWhenIsPlayingFx(previousAsset)
  }

  if (!isFoundAsset) {
    throw new Error('Asset not found')
  }

  throw new Error(
    'The previous sound cannot be played because it is the first asset'
  )
})

export const pauseCurrentSoundFx = createEffect(async () => {
  return $audioSound.getState().sound.pauseAsync()
})

pauseCurrentSoundFx.done.watch(() => {
  setIsPlaying(false)
  stopTimer()
})

export const playCurrentSoundFx = createEffect(async () => {
  return $audioSound.getState().sound.playAsync()
})

playCurrentSoundFx.done.watch(() => {
  runTimerAndPlay()
})

export const setPositionFx = createEffect(async (positionMillis: number) => {
  const durationMillis = $audioPlaybackStatus.getState().status?.durationMillis

  if (durationMillis) {
    runTimerWhenIsPlaying()

    return $audioSound
      .getState()
      .sound.setPositionAsync(positionMillis * durationMillis)
  }

  throw new Error('Status is not exist in $audioPlaybackStatus')
})

const updateonPlaybackStatust = createEvent<AVPlaybackStatusSuccess>()
const runTimerWhenIsPlaying = createEvent()
const resetTimer = createEvent()
export const stopTimer = createEvent()
export const setTimeInMs = createEvent<number>()
export const setIsPlaying = createEvent<boolean>()

const runTimerAndPlay = () => {
  setIsPlaying(true)
  runTimerWhenIsPlaying()
}

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
  .on(runTimerWhenIsPlaying, (state) => {
    if (!state.isPlaying) {
      return state
    }

    if (!state.isRunningTimer) {
      const timerId = setInterval(runTimerWhenIsPlaying, msPerSecond)

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

const setQueue = createEvent<Asset[]>()
const setCurrentAsset = createEvent<Asset>()
export const toggleRandomMode = createEvent()

export const $audioSound = createStore<TAudioControl>({
  sound: new Audio.Sound(),
})

export const $audioQueue = createStore<TAudioQueue>({
  queue: [],
  currentAsset: null,
  isRandomMode: false,
})
  .on(setQueue, (state, assets) => {
    return { ...state, queue: assets }
  })
  .on(setCurrentAsset, (state, asset) => {
    return { ...state, currentAsset: asset }
  })
  .on(toggleRandomMode, (state) => {
    return { ...state, isRandomMode: !state.isRandomMode }
  })

const setCurrentQueue = () => {
  const { currentAsset, isRandomMode } = $audioQueue.getState()
  const assets = $audioAssets.getState().currentAlbum.assets

  if (isRandomMode && currentAsset !== null) {
    setQueue(shuffleArrayExceptFirst(currentAsset, assets))
  } else {
    setQueue(assets)
  }
}

playSoundFx.done.watch(setCurrentQueue)
toggleRandomMode.watch(setCurrentQueue)

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
