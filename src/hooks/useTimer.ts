import { useState, useEffect, useCallback } from 'react'
import formatMsToTimeString from '@/src/utils/time/formatMsToTimeString'
import { msPerSecond } from '@/src/utils/time/constants'

const useTimer = ({
  stopTimeMs,
  onStopTime,
  startTimeMs = 0,
}: {
  startTimeMs?: number
  stopTimeMs?: number
  onStopTime: () => void
}) => {
  const [timeInMs, setTimeInMs] = useState(startTimeMs)
  const [isRunning, setIsRunning] = useState(true)

  const start = useCallback(() => setIsRunning(true), [])
  const stop = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => setTimeInMs(0), [])

  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        setTimeInMs((prevTime) => prevTime + msPerSecond)
      }, msPerSecond)

      return () => clearInterval(timerId)
    }
  }, [isRunning])

  useEffect(() => {
    if (stopTimeMs && timeInMs >= stopTimeMs) {
      onStopTime()
      reset()
    }
  }, [timeInMs, stopTimeMs, onStopTime, reset])

  return {
    formatedTime: formatMsToTimeString(timeInMs),
    timeInMs,
    start,
    stop,
    reset,
  }
}

export default useTimer
