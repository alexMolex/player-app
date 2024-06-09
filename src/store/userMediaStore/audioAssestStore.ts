import { createEvent, createStore } from 'effector'

import type { TAudioAssets } from './types'

export const saveAudioAssets = createEvent<TAudioAssets>()

const audioAssestStore = createStore<TAudioAssets>({
  assets: [],
  endCursor: '',
  hasNextPage: false,
  totalCount: 0,
}).on(saveAudioAssets, (state, value) => {
  return value
})

export default audioAssestStore
