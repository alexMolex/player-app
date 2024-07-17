import type { Asset } from 'expo-media-library'

export const audioAssetsMock = {
  assets: [
    {
      albumId: '82896267',
      creationTime: 0,
      duration: 80.597,
      filename: 'It_is_realme.mp3',
      height: 0,
      id: '176',
      mediaType: 'audio',
      modificationTime: 1631809384000,
      uri: 'file:///storage/emulated/0/Music/It_is_realme.mp3',
      width: 0,
    },
    {
      albumId: '82896262',
      creationTime: 0,
      duration: 81.597,
      filename: 'It_is_realme.mp3',
      height: 0,
      id: '177',
      mediaType: 'audio',
      modificationTime: 1631809384000,
      uri: 'file:///storage/emulated/0/MusicSecond/It_is_realme.mp3',
      width: 0,
    },
  ] as Asset[],
  endCursor: '335',
  hasNextPage: false,
  totalCount: 335,
}

export const albumsMock = {
  [audioAssetsMock.assets[0].albumId!]: {
    name: 'Music',
    list: [audioAssetsMock.assets[0]],
  },
  [audioAssetsMock.assets[1].albumId!]: {
    name: 'MusicSecond',
    list: [audioAssetsMock.assets[1]],
  },
}

export const bigAssetsMock = [
  {
    albumId: '82896267',
    creationTime: 0,
    duration: 80.597,
    filename: 'It_is_realme.mp3',
    height: 0,
    id: '176',
    mediaType: 'audio',
    modificationTime: 1631809384000,
    uri: 'file:///storage/emulated/0/Music/It_is_realme.mp3',
    width: 0,
  },
  {
    albumId: '82896262',
    creationTime: 0,
    duration: 81.597,
    filename: 'It_is_realme2.mp3',
    height: 0,
    id: '177',
    mediaType: 'audio',
    modificationTime: 1631809384000,
    uri: 'file:///storage/emulated/0/MusicSecond/It_is_realme.mp3',
    width: 0,
  },
  {
    albumId: '82896262',
    creationTime: 0,
    duration: 85.597,
    filename: 'It_is_realme3.mp3',
    height: 0,
    id: '178',
    mediaType: 'audio',
    modificationTime: 1631809384000,
    uri: 'file:///storage/emulated/0/MusicSecond/It_is_realme3.mp3',
    width: 0,
  },
  {
    albumId: '82896262',
    creationTime: 0,
    duration: 85.597,
    filename: 'It_is_realme4.mp3',
    height: 0,
    id: '179',
    mediaType: 'audio',
    modificationTime: 1631809384000,
    uri: 'file:///storage/emulated/0/MusicSecond/It_is_realme4.mp3',
    width: 0,
  },
] as Asset[]
