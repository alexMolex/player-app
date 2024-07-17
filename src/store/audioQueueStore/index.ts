import { createEvent, createStore } from 'effector'
import { Asset } from 'expo-media-library'
import shuffleArrayExceptFirst from '@/src/utils/array/shuffleArrayExceptFirst'
import { $currentPlaylist } from '../audioPlaylistsStore'
import { TAudioQueue, TAudioQueueStorage, TRepeatMode } from './types'

const setQueue = createEvent<Asset[]>()
export const setCurrentAsset = createEvent<Asset>()
export const setRepeatMode = createEvent<TRepeatMode>()
export const toggleRandomMode = createEvent()
export const initStoreFromStorage = createEvent<TAudioQueueStorage>()

export const setCurrentQueue = () => {
  const { currentAsset, isRandomMode } = $audioQueue.getState()
  const currentAlbumAssets = $currentPlaylist.getState().assets

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

export const AUDIO_QUEUE_STORE_NAME = 'AUDIO_QUEUE_STORE'

export const $audioQueue = createStore<TAudioQueue>(
  {
    queue: [],
    currentAsset: null,
    isRandomMode: false,
    repeatMode: 'none',
  },
  {
    name: AUDIO_QUEUE_STORE_NAME,
  }
)
  .on(initStoreFromStorage, (state, storageState) => {
    return { ...state, ...storageState }
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
  .on(setRepeatMode, (state, repeatMode) => {
    return { ...state, repeatMode }
  })

toggleRandomMode.watch(setCurrentQueue)
