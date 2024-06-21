import React, { useState } from 'react'
import { useUnit } from 'effector-react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import {
  playNextSoundFx,
  pauseCurrentSoundFx,
  playPreviousSoundFx,
  playCurrentSoundFx,
  setPositionFx,
  audioPlaybackStatuslStore as audioPlaybackStatuslStoreUnit,
} from '@/src/store/audioControllStore'
import useTimer from '@/src/hooks/useTimer'
import formatMsToTimeString from '@/src/utils/time/formatMsToTimeString'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

const PlayerModal = () => {
  const router = useRouter()
  const [
    audioPlaybackStatuslStore,
    playNextSound,
    isPendingPlayNextSound,
    playPreviousSound,
    isPendingPlayPreviousSound,
    pauseCurrentSound,
    isPendingPauseCurrentSound,
    playCurrentSound,
    isPendingPlayCurrentSound,
    setPosition,
  ] = useUnit([
    audioPlaybackStatuslStoreUnit,
    playNextSoundFx,
    playNextSoundFx.pending,
    playPreviousSoundFx,
    playPreviousSoundFx.pending,
    pauseCurrentSoundFx,
    pauseCurrentSoundFx.pending,
    playCurrentSoundFx,
    playCurrentSoundFx.pending,
    setPositionFx,
    setPositionFx.pending,
  ])
  const { formatedTime, timeInMs, start, stop } = useTimer({
    onStopTime: playNextSound,
    startTimeMs: audioPlaybackStatuslStore.status?.positionMillis,
    stopTimeMs: audioPlaybackStatuslStore.status?.durationMillis,
  })

  const audioPosision =
    audioPlaybackStatuslStore.status?.durationMillis &&
    timeInMs / audioPlaybackStatuslStore.status.durationMillis

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
      />
      <Text>
        {formatedTime}/
        {formatMsToTimeString({
          timeInMs: audioPlaybackStatuslStore.status?.durationMillis ?? 0,
        })}
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={playPreviousSound}>
          <AntDesign name="stepbackward" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={stop}>
          <FontAwesome name={'pause'} size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={start}>
          <FontAwesome name={'play'} size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNextSound}>
          <AntDesign name="stepforward" size={30} color="black" />
        </TouchableOpacity>
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
