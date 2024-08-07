import { usePermissions, getAssetsAsync } from 'expo-media-library'
import { useEffect } from 'react'
import { saveAudioAssets } from '..'

const useRequestAudioFiles = () => {
  const [permissionResponse, requestPermission] = usePermissions({
    granularPermissions: ['audio'],
  })

  const getAlbums = async () => {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission()
    }

    getAssetsAsync({
      mediaType: 'audio',
      first: Infinity,
    })
      .then((fetchedAlbums) => {
        saveAudioAssets(fetchedAlbums.assets)
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
