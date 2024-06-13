import { useCallback, useState } from 'react'

const useBoolean = (
  initialState: boolean = false
): [boolean, () => void, () => void, () => void] => {
  const [isTruethy, setIsTruethy] = useState<boolean>(initialState)

  const setTrueValue = useCallback(() => {
    setIsTruethy(true)
  }, [])

  const setFalseValue = useCallback(() => {
    setIsTruethy(false)
  }, [])

  const toggle = useCallback(() => {
    setIsTruethy((previusValue) => !previusValue)
  }, [])

  return [isTruethy, setTrueValue, setFalseValue, toggle]
}

export default useBoolean
