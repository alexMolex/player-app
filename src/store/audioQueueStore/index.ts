import { createEvent, createStore } from 'effector'
import { Asset } from 'expo-media-library'
import shuffleArrayExceptFirst from '@/src/utils/array/shuffleArrayExceptFirst'
import $audioAssets from '../audioAssetsStore'
import { TAudioQueue } from './types'

const setQueue = createEvent<Asset[]>()
export const setCurrentAsset = createEvent<Asset>()
export const toggleRandomMode = createEvent()

export const setCurrentQueue = () => {
  const { currentAsset, isRandomMode } = $audioQueue.getState()
  const currentAlbumAssets = $audioAssets.getState().currentAlbum.assets

  if (isRandomMode && currentAsset !== null) {
    setQueue(shuffleArrayExceptFirst(currentAsset, currentAlbumAssets))
  } else {
    setQueue(currentAlbumAssets)
  }
}

export const getAssetPosition = () => {
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

toggleRandomMode.watch(setCurrentQueue)
