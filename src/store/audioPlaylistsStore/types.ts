import type { Asset } from 'expo-media-library'

export type TCurrentAlbun = {
  albumId: string
  name: string
  assets: Asset[]
}
export type TAudioAssets = {
  assets: Asset[]
  currentAlbum: TCurrentAlbun
}

export type TAlbums = Record<
  string,
  { name: string; isHandleAdded: boolean; list: Asset[] }
>