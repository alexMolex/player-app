import { Asset } from 'expo-media-library'

export type TRepeatMode = 'none' | 'once' | 'every'

export type TAudioQueue = {
  queue: Asset[]
  currentAsset: null | Asset
  isRandomMode: boolean
  repeatMode: TRepeatMode
}

export type TAudioQueueStorage = Omit<TAudioQueue, 'queue' | 'currentAsset'>
