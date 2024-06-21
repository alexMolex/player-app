/**
 * Time must be less than 100
 */
const formatTwoDigitNumber = (time: number) => {
  if (time >= 100) {
    return `${time}`
  }

  return String(time).padStart(2, '0')
}

export default formatTwoDigitNumber
