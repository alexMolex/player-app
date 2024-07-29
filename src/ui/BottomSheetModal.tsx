import React, { useRef } from 'react'
import { Modal, View, Animated, StyleSheet, PanResponder } from 'react-native'
import { WINDOW_HEIGHT } from '@/src/constants/window'

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.9
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.4
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT
const MAX_DOWNWARD_TRANSLATE_Y = 0
const DRAG_THRESHOLD = 100

const BottomSheetModal: React.FC<{
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
}> = ({ isVisible, onClose, children }) => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const currentGestureDy = useRef(0)

  const closeModal = () => {
    onClose()

    currentGestureDy.current = 0
    animatedValue.setValue(0)
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(currentGestureDy.current)
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy)
      },
      onPanResponderRelease: (e, { dy }) => {
        animatedValue.flattenOffset()
        currentGestureDy.current += dy

        const isSwipingDownForClose =
          currentGestureDy.current > BOTTOM_SHEET_MAX_HEIGHT * 0.15
        const isSwipingUp = dy <= -DRAG_THRESHOLD
        const isSwipingUpperMaxUpward =
          -currentGestureDy.current <= MAX_UPWARD_TRANSLATE_Y

        if (isSwipingDownForClose) {
          closeModal()
        } else if (isSwipingUp || isSwipingUpperMaxUpward) {
          springAnimation('up')
        } else {
          springAnimation('down')
        }
      },
    })
  ).current

  const springAnimation = (direction: 'up' | 'down') => {
    currentGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y

    Animated.spring(animatedValue, {
      toValue: currentGestureDy.current,
      useNativeDriver: true,
    }).start()
  }

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolateLeft: 'clamp',
        }),
      },
    ],
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.bar} />
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: 'gray',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    height: '100%',
    width: '100%',
  },
  bar: {
    width: 80,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  draggableArea: {
    width: '100%',
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default BottomSheetModal
