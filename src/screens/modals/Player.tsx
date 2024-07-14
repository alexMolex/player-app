import React from 'react'
import { useUnit } from 'effector-react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import {
  playNextSoundFx,
  pauseCurrentSoundFx,
  playPreviousSoundFx,
  playCurrentSoundFx,
  setPositionFx,
  setTime,
  stopTimer,
  $audioPlaybackStatus,
  $audioPosision,
} from '@/src/store/audioControllStore'
import formatMsToTimeString from '@/src/utils/time/formatMsToTimeString'
import Foundation from '@expo/vector-icons/Foundation'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { $audioQueue, toggleRandomMode } from '@/src/store/audioQueueStore'

const PlayerModal = () => {
  const router = useRouter()

  const [
    audioQueue,
    audioPlaybackStatusStore,
    audioPosision,
    playNextSound,
    isPendingPlayNextSound,
    playPreviousSound,
    isPendingPlayPreviousSound,
    pauseCurrentSound,
    playCurrentSound,
    setPosition,
  ] = useUnit([
    $audioQueue,
    $audioPlaybackStatus,
    $audioPosision,
    playNextSoundFx,
    playNextSoundFx.pending,
    playPreviousSoundFx,
    playPreviousSoundFx.pending,
    pauseCurrentSoundFx,
    playCurrentSoundFx,
    setPositionFx,
  ])

  const { isPlaying, timeoutMs } = audioPlaybackStatusStore

  const formatedTime = formatMsToTimeString(timeoutMs)
  const isDisabledControls =
    isPendingPlayNextSound || isPendingPlayPreviousSound

  return (
    <View style={styles.container}>
      <Image
        source={require('@/src/assets/images/partial-react-logo.png')}
        style={styles.albumCover}
      />
      <Slider
        value={audioPosision}
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        onValueChange={setTime}
        onSlidingComplete={setPosition}
        onSlidingStart={() => stopTimer()}
      />
      <Text>
        {formatedTime}/
        {formatMsToTimeString(
          audioPlaybackStatusStore.status?.durationMillis ?? 0
        )}
      </Text>
      <Text style={{ width: 300 }}>{audioPlaybackStatusStore.status?.uri}</Text>
      <View style={styles.controls}>
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
        {audioQueue.isRandomMode ? (
          <TouchableOpacity
            disabled={isDisabledControls}
            onPress={() => toggleRandomMode()}
          >
            <MaterialIcons name="shuffle-on" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isDisabledControls}
            onPress={() => toggleRandomMode()}
          >
            <Foundation name="shuffle" size={30} color="black" />
          </TouchableOpacity>
        )}
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
