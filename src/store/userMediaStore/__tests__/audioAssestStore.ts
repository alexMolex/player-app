import audioAssestStore, {
  deviceAudioAlbumsCollection,
  saveAudioAssets,
} from '../audioAssestStore'
import { audioAssetsMock, albumsMock } from '../__fixtures__/audioAssetsMock'

describe('audioAssestStore', () => {
  it('should save audio when saveAudioAssets', () => {
    saveAudioAssets(audioAssetsMock)

    expect(audioAssestStore.getState()).toEqual({
      assets: audioAssetsMock.assets,
      totalCount: audioAssetsMock.totalCount,
    })
  })

  it('should get albums in audioAssetsAlbum', () => {
    saveAudioAssets(audioAssetsMock)

    expect(deviceAudioAlbumsCollection.getState()).toEqual(albumsMock)
  })
})
