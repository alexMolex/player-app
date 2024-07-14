import shuffleArray from './shuffleArray'

const shuffleArrayExceptFirst = <T>(firstAsset: T, assets: T[]): T[] => {
  const assetsCopy = [...assets]
  const firstAssetIndex = assetsCopy.indexOf(firstAsset)

  if (firstAssetIndex === -1) {
    return assetsCopy
  }

  assetsCopy.splice(firstAssetIndex, 1)

  const shuffledArray = shuffleArray(assetsCopy)

  shuffledArray.unshift(firstAsset)

  return shuffledArray
}

export default shuffleArrayExceptFirst
