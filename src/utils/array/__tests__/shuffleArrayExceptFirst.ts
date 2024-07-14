import shuffleArrayExceptFirst from '../shuffleArrayExceptFirst'

describe('shuffleArrayExceptFirst function', () => {
  test('shuffled array should contain the same elements as the input array (different order) with the first element intact', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const firstElement = 1
    const shuffledArray = shuffleArrayExceptFirst(firstElement, inputArray)

    expect(shuffledArray.length).toBe(inputArray.length)
    expect(shuffledArray).not.toEqual(inputArray)

    expect(shuffledArray).toContain(firstElement)

    inputArray.forEach((element) => {
      if (element !== firstElement) {
        expect(shuffledArray).toContain(element)
      }
    })
  })

  test('shuffling an array with the first asset not found should return the same array', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const nonExistingElement = 6
    const shuffledArray = shuffleArrayExceptFirst(
      nonExistingElement,
      inputArray
    )

    expect(shuffledArray.length).toBe(inputArray.length)
    expect(shuffledArray).not.toEqual(inputArray)

    inputArray.forEach((element) => {
      expect(shuffledArray).toContain(element)
    })
  })
})
