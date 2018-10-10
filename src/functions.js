function getCorrectAnswersInQstnAttemps (question, qstnSource) {
  /* returns array */
  return question.attempts.filter(attempt => attempt.answer === qstnSource.answer)
}

export { getCorrectAnswersInQstnAttemps }
