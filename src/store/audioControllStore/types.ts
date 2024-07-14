import type { AVPlaybackStatusSuccess } from 'expo-av'

export type TAudioPlaybackStatus = {
  status?: AVPlaybackStatusSuccess
  timeoutMs: number
  isPlaying: boolean
  isRunningTimer: boolean
  timerId: NodeJS.Timeout | null
}
