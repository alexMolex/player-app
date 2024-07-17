import { $audioAssets, saveAudioAssets } from '..'
import { audioAssetsMock } from '../__fixtures__/audioAssetsMock'

describe('$audioAssets', () => {
  it('should save audio when saveAudioAssets', () => {
    saveAudioAssets(audioAssetsMock.assets)

    expect($audioAssets.getState()).toEqual({
      assets: audioAssetsMock.assets,
    })
  })
})
