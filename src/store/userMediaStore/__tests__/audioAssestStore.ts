import audioAssestStore, { saveAudioAssets } from '../audioAssestStore'
import type { Asset } from 'expo-media-library'

describe('audioAssestStore', () => {
  const audioAssetsMock = {
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
    ] as Asset[],
    endCursor: '335',
    hasNextPage: false,
    totalCount: 335,
  }

  it('should save audio when saveAudioAssets', () => {
    saveAudioAssets(audioAssetsMock)

    expect(audioAssestStore.getState()).toEqual(audioAssetsMock)
  })
})
