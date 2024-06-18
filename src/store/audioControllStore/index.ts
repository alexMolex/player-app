import { sample, createEvent, createStore } from 'effector'
import { Audio } from 'expo-av'
import { Asset } from 'expo-media-library'
import { showErrorNotificationFx } from '../notification'
import { playSoundFx } from './effects'
import type { TAudioControl, TAudioQueue } from './types'

export const audioSoundStore = createStore<TAudioControl>({
  sound: new Audio.Sound(),
})

// export const audioControlStore = createStore<TAudioControl>({
//   sound: new Audio.Sound(),
// })

const addAudioToQueue = createEvent<Asset>()
const setCurrentAsset = createEvent<Asset>()
export const toggleRandomMode = createEvent()

export const audioQueueStore = createStore<TAudioQueue>({
  randomQueue: [],
  currentAsset: null,
  isRandomMode: false,
})
  .on(addAudioToQueue, (state, asset) => {
    return { ...state, randomQueue: [...state.randomQueue, asset] }
  })
  .on(toggleRandomMode, (state) => {
    return { ...state, isRandomMode: !state.isRandomMode }
  })

sample({
  clock: playSoundFx.done,
  target: audioSoundStore,
  fn: ({ result: sound }) => {
    return { sound }
  },
})

playSoundFx.watch((asset) => {
  setCurrentAsset(asset)
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
