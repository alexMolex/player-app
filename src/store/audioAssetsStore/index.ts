import { createEvent, createStore } from 'effector'
import type { Asset } from 'expo-media-library'
import type { TAudioAssets, TAlbums } from './types'
import { getAlbumNameFromAsset } from './utils'

export const saveAudioAssets = createEvent<Asset[]>()
export const setCurrentAlbum = createEvent<Asset[]>()

export const $audioAssets = createStore<TAudioAssets>({
  assets: [],
  currentAlbum: [],
})
  .on(saveAudioAssets, (state, assets) => {
    return { ...state, assets }
  })
  .on(setCurrentAlbum, (state, currentAlbum) => {
    return { ...state, currentAlbum }
  })

export const deviceAudioAlbumsCollection = $audioAssets.map(({ assets }) => {
  const audioAlbumsCollection = assets.reduce<TAlbums>(
    (assetCollection, asset) => {
      // Album ID exist only for android
      const albumId = asset.albumId as string

      if (albumId in assetCollection) {
        assetCollection[albumId].list.push(asset)
      } else {
        assetCollection[albumId] = {
          name: getAlbumNameFromAsset(asset),
          list: [asset],
        }
      }

      return assetCollection
    },
    {}
  )

  return audioAlbumsCollection
})

export default $audioAssets
