import shuffleArray from './shuffleArray'

const shuffleArrayExceptFirst = <T>(firstElem: T, list: T[]): T[] => {
  const firstElemIndex = list.indexOf(firstElem)

  if (firstElemIndex === -1) {
    return shuffleArray(list)
  }

  const listCopy = [...list]

  listCopy.splice(firstElemIndex, 1)

  const shuffledArray = shuffleArray(listCopy)

  return [firstElem, ...shuffledArray]
}

export default shuffleArrayExceptFirst
