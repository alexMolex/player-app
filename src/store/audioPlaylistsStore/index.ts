import { combine, createEvent, createStore } from 'effector'
import type { Asset } from 'expo-media-library'
import type { TAudioAssets, TAlbums, TCurrentAlbun } from './types'
import { getAlbumNameFromAsset } from './utils'

export const saveAudioAssets = createEvent<Asset[]>()
export const setCurrentAlbum = createEvent<TCurrentAlbun>()

export const $audioAssets = createStore<TAudioAssets>({
  assets: [],
  currentAlbum: { albumId: '', name: '', assets: [] },
})
  .on(saveAudioAssets, (state, assets) => {
    return { ...state, assets }
  })
  .on(setCurrentAlbum, (state, currentAlbum) => {
    return { ...state, currentAlbum }
  })

export const $deviceAudioAlbumsCollection = $audioAssets.map(({ assets }) => {
  const audioAlbumsCollection = assets.reduce<TAlbums>(
    (assetCollection, asset) => {
      // Album ID exist only for android
      const albumId = asset.albumId as string

      if (albumId in assetCollection) {
        assetCollection[albumId].list.push(asset)
      } else {
        assetCollection[albumId] = {
          name: getAlbumNameFromAsset(asset),
          isHandleAdded: false,
          list: [asset],
        }
      }

      return assetCollection
    },
    {}
  )

  return audioAlbumsCollection
})

export const addPlaylist = createEvent<{ name: string; assets?: Asset[] }>()
export const addTrackToPlaylist = createEvent<{
  playlistName: string
  asset: Asset
}>()
export const initStoreFromStorage = createEvent<TAlbums>()

export const PLAY_LIST_STORE_NAME = 'PLAY_LIST_STORE'

export const $playlists = createStore<TAlbums>(
  {},
  {
    name: PLAY_LIST_STORE_NAME,
  }
)
  .on(initStoreFromStorage, (_, storageState) => {
    return storageState
  })
  .on(addPlaylist, (state, { name, assets }) => {
    return {
      ...state,
      [name]: { name, isHandleAdded: true, list: assets || [] },
    }
  })
  .on(addTrackToPlaylist, (state, { playlistName, asset }) => {
    if (playlistName in state) {
      const playList = state[playlistName]

      return {
        ...state,
        [playlistName]: {
          ...playList,
          list: [asset, ...playList.list],
        },
      }
    }

    return state
  })

export const $combinedPlaylists = combine(
  $playlists,
  $deviceAudioAlbumsCollection,
  (playlists, deviceAudioAlbums) => {
    return { ...playlists, ...deviceAudioAlbums }
  }
)

export default $audioAssets
