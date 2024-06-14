import { sample, createStore } from 'effector'
import type { TAudioControll } from './types'
import { Audio } from 'expo-av'
import { showErrorNotificationFx } from '../notification'
import playSoundFx from './effects/playSoundFx'

const audioControllStore = createStore<TAudioControll>({
  sound: new Audio.Sound(),
})

sample({
  clock: playSoundFx.done,
  target: audioControllStore,
  fn: ({ result: sound }) => {
    return { sound }
  },
})

sample({
  clock: playSoundFx.failData,
  target: showErrorNotificationFx,
})

export default audioControllStore
