import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'

type ItemProps = {
  title: string
  id: string
  coverUrl: ReturnType<NodeRequire>
  onMenuPress: () => void
}

const AudioListItem: React.FC<ItemProps> = ({
  coverUrl,
  title,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <Image source={coverUrl} style={styles.cover} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Text style={styles.menu}>⋮</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  menu: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
  },
  menuButton: {
    padding: 10,
  },
})

export default AudioListItem
