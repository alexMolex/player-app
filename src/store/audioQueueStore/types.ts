import { Asset } from 'expo-media-library'

export type TAudioQueue = {
  queue: Asset[]
  currentAsset: null | Asset
  isRandomMode: boolean
}
