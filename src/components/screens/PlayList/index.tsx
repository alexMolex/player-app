import { FlatList, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { useUnit } from 'effector-react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {
  $currentPlaylist,
  $combinedPlaylists,
} from '@/src/store/audioPlaylistsStore'
import useBoolean from '@/src/hooks/useBoolean'
import BottomSheetModal from '@/src/ui/BottomSheetModal'
import AudioItem from './AudioItem'

const PlayList = () => {
  const [isVisibleModal, openModal, closeModal] = useBoolean(false)

  const [combinedPlaylists, { albumId }] = useUnit([
    $combinedPlaylists,
    $currentPlaylist,
  ])

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openModal}>
          <MaterialIcons name="more-vert" size={32} color="black" />
        </TouchableOpacity>
      ),
    })
  }, [navigation, openModal])

  const isExistAlbum = albumId && combinedPlaylists[albumId]

  if (!isExistAlbum) {
    return <Text>Нет доступных альбомов</Text>
  }

  return (
    <>
      <BottomSheetModal isVisible={isVisibleModal} onClose={closeModal}>
        <Text>1234</Text>
      </BottomSheetModal>
      <FlatList
        data={combinedPlaylists[albumId].list}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <AudioItem song={item} />}
      />
    </>
  )
}

export default PlayList
