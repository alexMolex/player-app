import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PressableLink from '@/src/ui/PressableLink'
import { rootLayoutRoutes } from '@/src/routes'

const MinimizedPlayer: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <PressableLink pathname={rootLayoutRoutes.playerModal.pathName}>
        <Text>Воспроизведение музыки...</Text>
      </PressableLink>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MinimizedPlayer
