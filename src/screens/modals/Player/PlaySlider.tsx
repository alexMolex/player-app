import React from 'react'
import { useUnit } from 'effector-react'
import { Text } from 'react-native'
import Slider from '@react-native-community/slider'
import {
  $audioPlaybackStatus,
  $audioPosision,
  setPositionFx,
  setTime,
  stopTimer,
} from '@/src/store/audioControllStore'
import formatMsToTimeString from '@/src/utils/time/formatMsToTimeString'

const PlaySlider = () => {
  const [audioPlaybackStatusStore, audioPosision, setPosition] = useUnit([
    $audioPlaybackStatus,
    $audioPosision,
    setPositionFx,
  ])

  const formatedTime = formatMsToTimeString(audioPlaybackStatusStore.timeoutMs)

  return (
    <>
      <Slider
        value={audioPosision}
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        onValueChange={setTime}
        onSlidingComplete={setPosition}
        onSlidingStart={() => stopTimer()}
      />
      <Text>
        {formatedTime}/
        {formatMsToTimeString(
          audioPlaybackStatusStore.status?.durationMillis ?? 0
        )}
      </Text>
    </>
  )
}

export default PlaySlider
