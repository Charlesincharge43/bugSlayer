export const testAndModify = function({rawOutput, solOutput, expected}) { // expected and expectedForOutput are arrays
  const outputLinesToTest = []
  const outputLinesforUser = []
  const outputsByLine = rawOutput.split('\n')
  // const outputLinesToTest = outputsByLine.filter(line => line.slice(0, 9) === '$ToTest$:')
  // try to implement reduce or ramda later... see Gabe's comment
  outputsByLine.forEach(line => {
    if (line.slice(0, 9) === '#ToTest#:') {
      outputLinesToTest.push(line)
    } else outputLinesforUser.push(line)
  })

  const outputsToTest = outputLinesToTest.map(line => line.split(':')[1])
  const outputsValuesToTest = outputLinesToTest.map(line => line.split(':')[2].slice(1, line.length))// slice is to get rid of empty space at beginning (console logging like console.log('str', var) will cause var to be a space away)

  const solOutputsValues = solOutput.split('\n')
                            .filter(line => line.slice(0, 9) === '#ToTest#:')
                            .map(line => line.split(':')[2].slice(1, line.length))

  let expectedLines = ''
  let completed = true
  let i
  for (i = 0; i < outputsValuesToTest.length; i++) {
    expectedLines = expectedLines.concat('Expected ', outputsToTest[i], ' to be ', solOutputsValues[i],'... got ', outputsValuesToTest[i],'\n')
    if (outputsValuesToTest[i] !== solOutputsValues[i]){
      completed = false
      break
    }
  }

  const finalLine = completed ? '\nGood job! You ROCK!' : `\nNot quite.. check the solution if you can't figure it out`
  const evalOutput = expectedLines + finalLine
  const outputForUser = outputLinesforUser.join('\n')
  return {outputForUser, evalOutput, completed}
}
