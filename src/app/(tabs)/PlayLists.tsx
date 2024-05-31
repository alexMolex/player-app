import { FlatList } from 'react-native'
import React from 'react'
import PlaylistItem from '@/src/components/PlaylistItem'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Favourite',
    tracksCount: 5,
    cover: require('@/src/assets/images/react-logo.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    tracksCount: 3,
    cover: require('@/src/assets/images/react-logo.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    tracksCount: 4,
    cover: require('@/src/assets/images/react-logo.png'),
  },
]

export default function PlayLists() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <PlaylistItem {...item} onMenuPress={() => alert('Clicked')} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
