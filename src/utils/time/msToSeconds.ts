import { msPerSecond } from './constants'

const msToSeconds = (timeInMs: number) => {
  return Math.floor(timeInMs / msPerSecond)
}

export default msToSeconds
