import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Favourite() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Press this one')}>
        <Ionicons size={36} name="play" color="green" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
