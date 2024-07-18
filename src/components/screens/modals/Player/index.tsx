import React from 'react'
import { useUnit } from 'effector-react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import {
  playNextSoundFx,
  pauseCurrentSoundFx,
  playPreviousSoundFx,
  playCurrentSoundFx,
  $isPlaying,
} from '@/src/store/audioControllStore'
import { $audioQueue } from '@/src/store/audioQueueStore'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import RepeatMode from './RepeatMode'
import RandomMode from './RandomMode'
import PlaySlider from './PlaySlider'

const PlayerModal = () => {
  const router = useRouter()

  const [
    isPlaying,
    audioQueueStore,
    playNextSound,
    isPendingPlayNextSound,
    playPreviousSound,
    isPendingPlayPreviousSound,
    pauseCurrentSound,
    playCurrentSound,
  ] = useUnit([
    $isPlaying,
    $audioQueue,
    playNextSoundFx,
    playNextSoundFx.pending,
    playPreviousSoundFx,
    playPreviousSoundFx.pending,
    pauseCurrentSoundFx,
    playCurrentSoundFx,
  ])

  const isDisabledControls =
    isPendingPlayNextSound || isPendingPlayPreviousSound
  const currentAsset = audioQueueStore.currentAsset

  return (
    <View style={styles.container}>
      <Image
        source={require('@/src/assets/images/partial-react-logo.png')}
        style={styles.albumCover}
      />
      <PlaySlider />
      {currentAsset && (
        <Text style={{ width: 300 }}>{currentAsset.filename}</Text>
      )}
      <View style={styles.controls}>
        <RepeatMode />
        <TouchableOpacity
          disabled={isDisabledControls}
          onPress={playPreviousSound}
        >
          <AntDesign name="stepbackward" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isDisabledControls}
          onPress={isPlaying ? pauseCurrentSound : playCurrentSound}
        >
          <FontAwesome
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity disabled={isDisabledControls} onPress={playNextSound}>
          <AntDesign name="stepforward" size={30} color="black" />
        </TouchableOpacity>
        <RandomMode />
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={router.back}>
        <AntDesign name="close" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  albumCover: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 40,
    width: '70%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
})

export default PlayerModal
