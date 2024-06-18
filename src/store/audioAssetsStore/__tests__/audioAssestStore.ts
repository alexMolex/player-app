import audioAssetsStore, {
  deviceAudioAlbumsCollection,
  saveAudioAssets,
  setCurrentAlbum,
} from '..'
import { audioAssetsMock, albumsMock } from '../__fixtures__/audioAssetsMock'

describe('audioAssetsStore', () => {
  it('should save audio when saveAudioAssets', () => {
    saveAudioAssets(audioAssetsMock.assets)

    expect(audioAssetsStore.getState()).toEqual({
      assets: audioAssetsMock.assets,
      currentAlbum: [],
    })
  })

  it('should get albums in audioAssetsAlbum', () => {
    saveAudioAssets(audioAssetsMock.assets)

    expect(deviceAudioAlbumsCollection.getState()).toEqual(albumsMock)
  })

  it('should set current album when call event', () => {
    expect(audioAssetsStore.getState().currentAlbum).toEqual([])

    const album = [audioAssetsMock.assets[0]]

    setCurrentAlbum(album)

    expect(audioAssetsStore.getState().currentAlbum).toEqual(album)
  })
})
