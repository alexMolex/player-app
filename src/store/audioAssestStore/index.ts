import { createEvent, createStore } from 'effector'
import type { TAudioAssets, TAlbums } from './types'
import { getAlbumNameFromAsset } from './utils'

export const saveAudioAssets = createEvent<TAudioAssets>()

const audioAssestStore = createStore<TAudioAssets>({
  assets: [],
  totalCount: 0,
}).on(saveAudioAssets, (state, { assets, totalCount }) => {
  return { assets, totalCount }
})

export const deviceAudioAlbumsCollection = audioAssestStore.map(
  ({ assets }) => {
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
  }
)

export default audioAssestStore
