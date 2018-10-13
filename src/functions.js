function getCorrectAnswersInQstnAttemps (question, qstnSource) {
  /* returns array */
  return question.attempts.filter(attempt => attempt.answer === qstnSource.answer)
}

function toPosition (value) {
  if (value === 0) {
    return 'zeroth'
  }
  // value = value + ''
  let unit = value % 10
  let tens = parseInt(value % 100 / 10)

  let wordIsTenth = tens === 1 && unit ? value % 100 : null
  // let tens = value % 100
  let mapUnitToWord = {
    1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 0: 'zeroth'
  }
  let mapTenthWords = {
    11: 'eleventh', 12: 'twelfth', 13: 'thirteenth', 14: 'fourteenth', 15: 'fifteenth', 16: 'sixteenth', 17: 'seventeenth', 18: 'eighteenth', 19: 'nineteenth'
  }
  let mapTenstoWord = {
    1: 'ten', 2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty', 7: 'seventy', 8: 'eighty', 9: 'ninety', 0: ''
  }

  let unitWord = unit ? mapUnitToWord[unit] : ''
  let tensWord = tens ? mapTenstoWord[tens] : ''

  if (!unit && tens) {
    tensWord = tens === 1 ? 'tenth' : tensWord.slice(0, -1) + 'ieth'
  }

  let position = tens ? wordIsTenth ? mapTenthWords[wordIsTenth] : tensWord + unitWord : unit ? unitWord : ''

  return position
}

export { getCorrectAnswersInQstnAttemps, toPosition }