import { View, Text, StyleSheet } from 'react-native'
import Avatar from './Avatar'
import Menu from './Menu'

type ItemProps = {
  title: string
  subtitle: string
  coverUrl: ReturnType<NodeRequire>
  onMenuPress: () => void
}

const AudioListItem: React.FC<ItemProps> = ({
  coverUrl,
  title,
  subtitle,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <Avatar avatarUrl={coverUrl} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Menu onMenuPress={onMenuPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
  },
})

export default AudioListItem
