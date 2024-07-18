import React, { useCallback } from 'react'
import { useUnit } from 'effector-react'
import type { Asset } from 'expo-media-library'
import AudioListItem from '@/src/ui/AudioListItem'
import { playSoundFx } from '@/src/store/audioControllStore'

const AudioItem: React.FC<{ song: Asset }> = ({ song }) => {
  const [playSound, isPendingPlaySound] = useUnit([
    playSoundFx,
    playSoundFx.pending,
  ])

  const onPressSong = useCallback(() => {
    playSound(song)
  }, [playSound, song])

  return (
    <AudioListItem
      coverUrl={require('@/src/assets/images/react-logo.png')}
      title={song.filename}
      isPlayingSound={isPendingPlaySound}
      subtitle={`${song.duration}`}
      onPress={onPressSong}
      onMenuPress={() => console.log(song.uri)}
    />
  )
}

export default AudioItem
