import React from 'react'
import { useUnit } from 'effector-react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { $audioQueue, setRepeatMode } from '@/src/store/audioQueueStore'

const RepeatMode = () => {
  const { repeatMode } = useUnit($audioQueue)

  if (repeatMode === 'once') {
    return (
      <TouchableOpacity
        onPress={() => {
          setRepeatMode('every')
        }}
      >
        <MaterialIcons name="repeat-one-on" size={30} color="black" />
      </TouchableOpacity>
    )
  }

  if (repeatMode === 'every') {
    return (
      <TouchableOpacity
        onPress={() => {
          setRepeatMode('none')
        }}
      >
        <MaterialIcons name="repeat-on" size={30} color="black" />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setRepeatMode('once')
      }}
    >
      <MaterialIcons name="repeat" size={30} color="black" />
    </TouchableOpacity>
  )
}

export default RepeatMode
