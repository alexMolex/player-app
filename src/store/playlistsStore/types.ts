import { Asset } from 'expo-media-library'

export type TPlaylist = Record<string, { name: string; list: Asset[] }>
