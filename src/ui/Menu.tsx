import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type TProps = {
  onMenuPress: () => void
}

const Menu: React.FC<TProps> = ({ onMenuPress }) => {
  return (
    <TouchableOpacity
      onPress={(event) => {
        event.preventDefault()
        onMenuPress()
      }}
      style={styles.menuButton}
    >
      <MaterialIcons name="more-vert" size={24} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 10,
  },
})

export default Menu
