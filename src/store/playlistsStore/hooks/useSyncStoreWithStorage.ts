import { useEffect } from 'react'
import getStateFromStorage from '@/src/utils/storage/getStateFromStorage'
import saveStateToStorage from '@/src/utils/storage/saveStateToStorage'
import { showErrorNotificationFx } from '../../notification'
import { $playlists, PLAY_LIST_STORE_NAME, initStoreFromStorage } from '..'
import { TAlbums } from '../../audioAssetsStore/types'

const useSyncStoreWithStorage = () => {
  useEffect(() => {
    getStateFromStorage<TAlbums>(PLAY_LIST_STORE_NAME)
      .then((data) => {
        if (data) {
          initStoreFromStorage(data)
        }
      })
      .catch(showErrorNotificationFx)
      .finally(() => {
        $playlists.watch((state) => {
          saveStateToStorage<TAlbums>(state, PLAY_LIST_STORE_NAME).catch(
            showErrorNotificationFx
          )
        })
      })
  }, [])
}

export default useSyncStoreWithStorage
