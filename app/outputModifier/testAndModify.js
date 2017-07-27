export const testAndModify = function({rawOutput, solOutput, expected}) { // expected and expectedForOutput are arrays
  // const outputLinesToTest = []
  let outputLinesforUser = []
  const outputsVariablesToTest = []
  const outputsValuesToTest = []
  const asyncLinesToTest = {}
  const outputsByLine = rawOutput.split('\n')
  // const outputLinesToTest = outputsByLine.filter(line => line.slice(0, 9) === '$ToTest$:')
  // try to implement reduce or ramda later... see Gabe's comment
  // console.log('unsplit outputsByLine ', outputsByLine)

  const indicesToRemove = [] // for async lines (for testing) that you need to take away
  outputsByLine.forEach((line, idx) => {
    // console.log('splitByColons ', splitbyColons)
    if (line.includes('#SPECIALTAG123#')) {
      const splitbyColons = line.split('::')
      const tag = splitbyColons[0]
      // console.log('tag is ', tag)
      const outputVariableToTest = splitbyColons[1]
      if (tag === '#SPECIALTAG123#ToTest#') { // #ToTest#::variableToTest::5
        const outputValueToTest = splitbyColons[2].split(' ').join('') // to get rid of potential empty space at beginning (console logging like console.log('str', var) will cause var to be a space away)
        outputsVariablesToTest.push(outputVariableToTest)
        outputsValuesToTest.push(outputValueToTest)
      } else if (tag === '#SPECIALTAG123#asyncBelowFlag#') { // you have to separate this out, and you have to loop through again later unfortunately (in the for loop for outputsValuesToTest) because async is below the to tests
        // console.log('in async below tag')
        const key = outputVariableToTest
        const value = outputsByLine[idx+1]
        // console.log('key value pair: ',key, ' ', value)
        indicesToRemove.push(idx+1)
        asyncLinesToTest[key] = value
      }
    } else {
      outputLinesforUser.push(line)
    }
  })
  console.log('outputLinesforUser earlier', outputLinesforUser)
  for (let index of indicesToRemove) {
    outputLinesforUser[index] = null
  }
  console.log('outputLinesforUser after the for loop ', outputLinesforUser)
  outputLinesforUser = outputLinesforUser.filter(line => line)
  // PSEUDOCODE: for all indicesToRemove... take out of outputLinesforUser (and shift the remaining.. AFTER all removal has done)
  // dont remove until the very end
  console.log('outputLinesforUser ', outputLinesforUser)

  const solOutputsValues = solOutput.split('\n')
                            .filter(line => line.split('::')[0] === '#SPECIALTAG123#ToTest#')
                            .map(line => line.split('::')[2].split(' ').join(''))

  // console.log('unsplit solOutputsValues ', solOutput)
  // console.log('solOutputsValues ', solOutputsValues)
  // console.log('outputsValuesToTest ', outputsValuesToTest)
  // console.log('asyncLinesToTest ', asyncLinesToTest)

  let expectedLines = ''
  let completed = true
  let i
  for (i = 0; i < outputsValuesToTest.length; i++) {
    // the expectedLines is not very dry... fix this asap
    let outputValueToTest = outputsValuesToTest[i]
    if (outputValueToTest.includes('#asyncBelowFlag#')) {
      const lookupKey = outputValueToTest.split(':')[1]
      outputValueToTest = asyncLinesToTest[lookupKey]
    }
    console.log('outputValueToTest is ', outputValueToTest)
    console.log('expected[i] ', expected[i])
    if (expected[i]) {
      if (expected[i].within) {
        if (expected[i].within.proportion) {
          const proportion = expected[i].within.proportion
          const lowerRange = 1 - proportion
          const upperRange = 1 + proportion
          const spread = Math.round(proportion * solOutputsValues[i])
          expectedLines = expectedLines.concat('Expected ', outputsVariablesToTest[i], ' to be ', solOutputsValues[i],' +/- ', spread  ,'... got ', outputValueToTest,'\n')
          if (outputValueToTest < solOutputsValues[i] * lowerRange || outputValueToTest > solOutputsValues[i] * upperRange ){
            completed = false
            break
          }
        }
      } else if (expected[i].tobe) {
        expectedLines = expectedLines.concat('Expected ', outputsVariablesToTest[i], ' to be ', expected[i].tobe,'... got ', outputValueToTest,'\n')
        console.log('outputsValues to test ', outputValueToTest, 'compared with ', expected[i].tobe)
        if (outputValueToTest !== expected[i].tobe) {
          completed = false
          break
        }
      }
    } else {
    expectedLines = expectedLines.concat('Expected ', outputsVariablesToTest[i], ' to be ', solOutputsValues[i],'... got ', outputValueToTest,'\n')
      if (outputValueToTest !== solOutputsValues[i]){
        completed = false
        break
      }
    }
  }

  const finalLine = completed ? '\nGood job! You ROCK!' : `\nNot quite.. check the solution if you can't figure it out`
  const evalOutput = expectedLines + finalLine
  const outputForUser = outputLinesforUser.join('\n')
  return {outputForUser, evalOutput, completed}
}
