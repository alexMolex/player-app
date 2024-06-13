import { FlatList, Text } from 'react-native'
import React from 'react'
import { useUnit } from 'effector-react'
import { useLocalSearchParams } from 'expo-router'
import AudioListItem from '@/src/components/AudioListItem'
import { deviceAudioAlbumsCollection } from '@/src/store/userMediaStore/audioAssestStore'

const PlayList = () => {
  const [deviceAudioAlbums] = useUnit([deviceAudioAlbumsCollection])
  const { id } = useLocalSearchParams<{ id: string }>()

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
          onMenuPress={() => alert('Clicked')}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default PlayList
