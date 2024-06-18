import React, { useCallback } from 'react'
import { useUnit } from 'effector-react'
import AudioListItem from '@/src/components/AudioListItem'
import { playSoundFx } from '@/src/store/audioControllStore/effects'
import { Asset } from 'expo-media-library'

const AudioItem: React.FC<{ song: Asset; list: Asset[] }> = ({ song }) => {
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
