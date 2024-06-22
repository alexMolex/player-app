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
  setTimeInMs,
  stopTimer,
  audioPlaybackStatuslStore as audioPlaybackStatuslStoreUnit,
  audioPosisionStore as audioPosisionStoreUnit,
} from '@/src/store/audioControllStore'
import formatMsToTimeString from '@/src/utils/time/formatMsToTimeString'
import useBoolean from '@/src/hooks/useBoolean'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

const PlayerModal = () => {
  const router = useRouter()
  const [isSliding, setIsSliding, setNotIsSliding] = useBoolean()
  const [
    audioPlaybackStatuslStore,
    audioPosisionStore,
    playNextSound,
    isPendingPlayNextSound,
    playPreviousSound,
    isPendingPlayPreviousSound,
    pauseCurrentSound,
    playCurrentSound,
    setPosition,
  ] = useUnit([
    audioPlaybackStatuslStoreUnit,
    audioPosisionStoreUnit,
    playNextSoundFx,
    playNextSoundFx.pending,
    playPreviousSoundFx,
    playPreviousSoundFx.pending,
    pauseCurrentSoundFx,
    playCurrentSoundFx,
    setPositionFx,
  ])
  const formatedTime = formatMsToTimeString(audioPlaybackStatuslStore.timeoutMs)
  const isPlaying = audioPlaybackStatuslStore.isRunningTimer || isSliding

  const onSlidingComplete = (value: number) => {
    setPosition(value)
    setNotIsSliding()
  }

  const onSlidingStart = () => {
    setIsSliding()
    stopTimer()
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/src/assets/images/partial-react-logo.png')}
        style={styles.albumCover}
      />
      <Slider
        value={audioPosisionStore}
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        onValueChange={setTimeInMs}
        onSlidingComplete={onSlidingComplete}
        onSlidingStart={onSlidingStart}
      />
      <Text>
        {formatedTime}/
        {formatMsToTimeString(
          audioPlaybackStatuslStore.status?.durationMillis ?? 0
        )}
      </Text>
      <Text style={{ width: 300 }}>
        {audioPlaybackStatuslStore.status?.uri}
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={playPreviousSound}>
          <AntDesign name="stepbackward" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isPlaying ? pauseCurrentSound : playCurrentSound}
        >
          <FontAwesome
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="black"
          />
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
