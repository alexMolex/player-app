import type { Asset } from 'expo-media-library'

export const getAlbumNameFromAsset = ({ uri }: Asset) => {
  return uri.split('/').at(-2) ?? uri
}
