import { Audio } from 'expo-av'
import { Asset } from 'expo-media-library'

export type TAudioControl = {
  sound: Audio.Sound
}

export type TAudioQueue = {
  randomQueue: Asset[]
  currentAsset: null | Asset
  isRandomMode: boolean
}
