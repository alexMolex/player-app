import shuffleArray from '../shuffleArray'

describe('shuffleArray function', () => {
  test('shuffled array should have the same length as the input array', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(inputArray)
    expect(shuffledArray.length).toBe(inputArray.length)
  })

  test('shuffled array should contain the same elements as the input array (different order)', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(inputArray)
    inputArray.forEach((element) => {
      expect(shuffledArray).toContain(element)
    })
  })

  test('shuffling an already sorted array should result in a different order', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(inputArray)
    expect(shuffledArray).not.toEqual(inputArray)
  })

  test('shuffling an array with duplicate elements should result in a different order', () => {
    const inputArray = [1, 1, 2, 2, 3, 3]
    const shuffledArray = shuffleArray(inputArray)
    expect(shuffledArray).not.toEqual(inputArray)
  })
})
