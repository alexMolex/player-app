import { Audio } from 'expo-av'
import type { AVPlaybackStatusSuccess } from 'expo-av'
import { Asset } from 'expo-media-library'

export type TAudioControl = {
  sound: Audio.Sound
}

export type TAudioPlaybackStatus = {
  status?: AVPlaybackStatusSuccess
  timeoutId: NodeJS.Timeout | null
}

export type TAudioQueue = {
  randomQueue: Asset[]
  currentAsset: null | Asset
  isRandomMode: boolean
}
