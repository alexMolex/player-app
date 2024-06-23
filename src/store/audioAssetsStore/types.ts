import type { Asset } from 'expo-media-library'

export type TAudioAssets = {
  assets: Asset[]
  currentAlbum: Asset[]
}
export type TAlbums = Record<string, { name: string; list: Asset[] }>
