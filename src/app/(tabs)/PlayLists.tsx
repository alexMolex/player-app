import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    coverUrl: require('@/src/assets/images/react-logo.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    coverUrl: require('@/src/assets/images/react-logo.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    coverUrl: require('@/src/assets/images/react-logo.png'),
  },
]

type ItemProps = {
  title: string
  id: string
  coverUrl: any
  onMenuPress: () => void
}

const AudioListItem = ({ coverUrl, title, onMenuPress }: ItemProps) => {
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
        <Text>⋮</Text>
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
  subtitle: {
    color: 'gray',
  },
  menuButton: {
    padding: 10,
  },
})

export default function PlayLists() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <AudioListItem {...item} onMenuPress={() => alert('Clicked')} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
