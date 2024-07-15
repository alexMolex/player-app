import React from 'react'
import { useUnit } from 'effector-react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { $audioQueue, toggleRandomMode } from '@/src/store/audioQueueStore'
import Foundation from '@expo/vector-icons/Foundation'

const RandomMode = () => {
  const { isRandomMode } = useUnit($audioQueue)

  return isRandomMode ? (
    <TouchableOpacity onPress={() => toggleRandomMode()}>
      <MaterialIcons name="shuffle-on" size={30} color="black" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => toggleRandomMode()}>
      <Foundation name="shuffle" size={30} color="black" />
    </TouchableOpacity>
  )
}

export default RandomMode
