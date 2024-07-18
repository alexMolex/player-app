import useBoolean from '@/src/hooks/useBoolean'
import { addPlaylist } from '@/src/store/audioPlaylistsStore'
import AddPlaylist from '@/src/ui/AddPlaylist'
import React, { useState, useRef } from 'react'
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const AddPlaylistModal = () => {
  const [isVisibleModal, openModal, closeModal] = useBoolean(false)
  const [playlistName, setPlaylistName] = useState('')
  const textInputRef = useRef<TextInput>(null)

  const handleAdd = () => {
    addPlaylist({ name: playlistName })
    setPlaylistName('')
    closeModal()
  }

  return (
    <>
      <AddPlaylist onPress={openModal} />
      <Modal
        transparent
        animationType="fade"
        visible={isVisibleModal}
        onShow={() => {
          setTimeout(() => {
            textInputRef.current?.focus()
          }, 50)
        }}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Название плейлиста"
                value={playlistName}
                onChangeText={setPlaylistName}
                style={styles.textInput}
                ref={textInputRef}
              />
              <View style={styles.buttons}>
                <View style={styles.button}>
                  <Button
                    title="Отменить"
                    color="gray"
                    onPress={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      closeModal()
                    }}
                  />
                </View>
                <View style={styles.button}>
                  <Button title="Сохранить" onPress={handleAdd} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 12,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
  },
})

export default AddPlaylistModal
