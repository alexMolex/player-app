import { createEvent, createStore, createEffect } from 'effector'
import type { AVPlaybackStatusSuccess } from 'expo-av'
import { Asset } from 'expo-media-library'
import { msPerSecond } from '@/src/utils/time/constants'
import type { TAudioPlaybackStatus } from './types'
import { $audioSound, prepareSoundFx } from '../audioSoundStore'
import {
  $audioQueue,
  getAssetPosition,
  setCurrentQueue,
  setRepeatMode,
} from '../audioQueueStore'
import { Audio } from 'expo-av'

const subscribeOnUpdateStatus = (sound: Audio.Sound) => {
  sound.setOnPlaybackStatusUpdate((status) => {
    updateonPlaybackStatust(status as AVPlaybackStatusSuccess)
  })
}

export const playSoundFx = createEffect(async (asset: Asset) => {
  try {
    const sound = await prepareSoundFx(asset)

    subscribeOnUpdateStatus(sound)

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

    subscribeOnUpdateStatus(sound)

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

const repeatSoundFx = createEffect(async () => {
  try {
    await $audioSound.getState().sound.replayAsync()

    resetTimer()
    runTimerAndPlay()
  } catch (error) {
    throw error
  }
})

export const pauseCurrentSoundFx = createEffect(async () => {
  return $audioSound.getState().sound.pauseAsync()
})

export const playCurrentSoundFx = createEffect(async () => {
  return $audioSound.getState().sound.playAsync()
})

export const setPositionFx = createEffect(async (position: number) => {
  const durationMillis = $audioPlaybackStatus.getState().status?.durationMillis

  if (durationMillis) {
    runTimerWhenIsPlaying()

    return $audioSound
      .getState()
      .sound.setPositionAsync(position * durationMillis)
  }

  throw new Error('Status is not exist in $audioPlaybackStatus')
})

const runTimerWhenIsPlaying = createEvent()
const resetTimer = createEvent()
const setIsPlaying = createEvent<boolean>()
export const updateonPlaybackStatust = createEvent<AVPlaybackStatusSuccess>()
export const stopTimer = createEvent()
export const setTime = createEvent<number>()

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
  .on(setTime, (state, position) => {
    const durationMillis = state.status?.durationMillis ?? 0
    const time = durationMillis * position

    // -100 so that the song does not switch when we set the time to the end
    const timeoutMs = Math.min(time, durationMillis - 100)

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

export const $audioPosision = $audioPlaybackStatus.map((state) => {
  const audioPosition = state.status?.durationMillis
    ? state.timeoutMs / state.status.durationMillis
    : 0

  return audioPosition
})

export const $isPlaying = $audioPlaybackStatus.map((state) => {
  return state.isPlaying
})

pauseCurrentSoundFx.done.watch(() => {
  setIsPlaying(false)
  stopTimer()
})

playCurrentSoundFx.done.watch(() => {
  runTimerAndPlay()
})

playSoundFx.done.watch(setCurrentQueue)

$audioPlaybackStatus.watch(({ status, timeoutMs }) => {
  const repeatMode = $audioQueue.getState().repeatMode
  const isEndOfSound =
    status?.durationMillis && status.durationMillis <= timeoutMs

  if (!isEndOfSound) {
    return
  }

  if (repeatMode === 'every') {
    return repeatSoundFx()
  }

  if (repeatMode === 'once') {
    repeatSoundFx()

    return setRepeatMode('none')
  }

  return playNextSoundFx()
})
