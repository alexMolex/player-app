import { useEffect } from 'react'
import getStateFromStorage from '@/src/utils/storage/getStateFromStorage'
import saveStateToStorage from '@/src/utils/storage/saveStateToStorage'
import { showErrorNotificationFx } from '../../notification'
import { $audioQueue, AUDIO_QUEUE_STORE_NAME, initStoreFromStorage } from '..'
import { TAudioQueueStorage } from '../types'

const useSyncStoreWithStorage = () => {
  useEffect(() => {
    getStateFromStorage<TAudioQueueStorage>(AUDIO_QUEUE_STORE_NAME)
      .then((data) => {
        if (data) {
          initStoreFromStorage(data)
        }
      })
      .catch(showErrorNotificationFx)
      .finally(() => {
        $audioQueue.watch(({ repeatMode, isRandomMode }) => {
          saveStateToStorage<TAudioQueueStorage>(
            { repeatMode, isRandomMode },
            AUDIO_QUEUE_STORE_NAME
          ).catch(showErrorNotificationFx)
        })
      })
  }, [])
}

export default useSyncStoreWithStorage
