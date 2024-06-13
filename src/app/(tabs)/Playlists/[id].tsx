import { FlatList, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { useLocalSearchParams } from 'expo-router'
import AudioListItem from '@/src/components/AudioListItem'
import { deviceAudioAlbumsCollection } from '@/src/store/userMediaStore/audioAssestStore'
import { Audio } from 'expo-av'

const PlayList = () => {
  const [sound, setSound] = useState<Audio.Sound>()

  const [deviceAudioAlbums] = useUnit([deviceAudioAlbumsCollection])
  const { id } = useLocalSearchParams<{ id: string }>()

  const playSound = useCallback(async (uri: string) => {
    const sound = new Audio.Sound()

    setSound(sound)

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false,
      })

      await sound.loadAsync({ uri })

      await sound.playAsync()
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')

          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const resolvePressAudioItem = useCallback(
    (uri: string) => {
      return () => {
        playSound(uri)
      }
    },
    [playSound]
  )

  if (!id || !deviceAudioAlbums[id]) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <FlatList
      data={deviceAudioAlbums[id].list}
      renderItem={({ item }) => (
        <AudioListItem
          coverUrl={require('@/src/assets/images/react-logo.png')}
          title={item.filename}
          subtitle={`${item.duration}`}
          onPress={resolvePressAudioItem(item.uri)}
          onMenuPress={() => console.log(item.uri)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default PlayList
