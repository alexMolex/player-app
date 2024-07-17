import { createEvent, createStore } from 'effector'
import type { Asset } from 'expo-media-library'
import type { TAudioAssets } from './types'

export const saveAudioAssets = createEvent<Asset[]>()

export const $audioAssets = createStore<TAudioAssets>({
  assets: [],
}).on(saveAudioAssets, (state, assets) => {
  return { ...state, assets }
})
