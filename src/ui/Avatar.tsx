import { Image, StyleSheet } from 'react-native'

type TProps = {
  avatarUrl: ReturnType<NodeRequire>
}

const Avatar: React.FC<TProps> = ({ avatarUrl }) => {
  return <Image source={avatarUrl} style={styles.cover} />
}

const styles = StyleSheet.create({
  cover: {
    width: 50,
    height: 50,
  },
})

export default Avatar
