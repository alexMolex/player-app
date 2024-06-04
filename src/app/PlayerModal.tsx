import React, { useState } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

const PlayerModal = () => {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackProgress, setPlaybackProgress] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Здесь должна быть логика воспроизведения или паузы музыки
  }

  const handleNext = () => {
    // Логика для перехода к следующему треку
  }

  const handlePrevious = () => {
    // Логика для перехода к предыдущему треку
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/src/assets/images/partial-react-logo.png')}
        style={styles.albumCover}
      />
      <Slider
        value={playbackProgress}
        onValueChange={setPlaybackProgress}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1fb28a"
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePrevious}>
          <AntDesign name="stepbackward" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <FontAwesome
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
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
