import { createStore, createEvent, combine } from 'effector'
import { Asset } from 'expo-media-library'
import { TAlbums } from '../audioAssetsStore/types'
import { $deviceAudioAlbumsCollection } from '../audioAssetsStore'

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
