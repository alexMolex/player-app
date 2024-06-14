import { usePermissions, getAssetsAsync } from 'expo-media-library'
import { useEffect } from 'react'
import { saveAudioAssets } from '..'

const useRequestAudioFiles = () => {
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ['audio'],
  })

  async function getAlbums() {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission()
    }

    getAssetsAsync({
      mediaType: 'audio',
      first: Infinity,
    })
      .then((fetchedAlbums) => {
        saveAudioAssets(fetchedAlbums)
      })
      .catch((err) => {
        console.log('🚀 ~ getAlbums ~ err:', err)
      })
  }

  useEffect(() => {
    getAlbums()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useRequestAudioFiles
