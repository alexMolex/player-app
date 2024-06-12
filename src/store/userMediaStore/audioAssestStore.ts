import { createEvent, createStore } from 'effector'
import type { TAudioAssets, TAlbums } from './types'
import { getNameFromAsset } from './utils'

export const saveAudioAssets = createEvent<TAudioAssets>()

const audioAssestStore = createStore<TAudioAssets>({
  assets: [],
  totalCount: 0,
}).on(saveAudioAssets, (state, { assets, totalCount }) => {
  return { assets, totalCount }
})

export const audioAssetsAlbum = audioAssestStore.map(({ assets }) => {
  const audioAlbums = assets.reduce<TAlbums>((assetCollection, asset) => {
    // Album ID exist only for android
    const albumId = asset.albumId as string

    if (albumId in assetCollection) {
      assetCollection[albumId].list.push(asset)
    } else {
      assetCollection[albumId] = {
        name: getNameFromAsset(asset),
        list: [asset],
      }
    }

    return assetCollection
  }, {})

  return audioAlbums
})

export default audioAssestStore
