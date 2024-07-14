import $audioAssets, {
  $deviceAudioAlbumsCollection,
  saveAudioAssets,
  setCurrentAlbum,
} from '..'
import { audioAssetsMock, albumsMock } from '../__fixtures__/audioAssetsMock'

describe('$audioAssets', () => {
  it('should save audio when saveAudioAssets', () => {
    saveAudioAssets(audioAssetsMock.assets)

    expect($audioAssets.getState()).toEqual({
      assets: audioAssetsMock.assets,
      currentAlbum: { albumId: '', name: '', assets: [] },
    })
  })

  it('should get albums in audioAssetsAlbum', () => {
    saveAudioAssets(audioAssetsMock.assets)

    expect($deviceAudioAlbumsCollection.getState()).toEqual(albumsMock)
  })

  it('should set current album when call event', () => {
    expect($audioAssets.getState().currentAlbum).toEqual({
      albumId: '',
      name: '',
      assets: [],
    })

    const album = [audioAssetsMock.assets[0]]

    setCurrentAlbum({ albumId: '', name: '', assets: album })

    expect($audioAssets.getState().currentAlbum.assets).toEqual(album)
  })
})
