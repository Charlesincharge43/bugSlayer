export const testAndModify = function({rawOutput, solOutput, expected}) { // expected and expectedForOutput are arrays
  // const outputLinesToTest = []
  console.log('rawOutput: ', rawOutput)
  console.log('solOutput: ', solOutput)
  let outputLinesforUser = []
  const outputsVariablesToTest = []
  const outputsValuesToTest = []
  const asyncLinesToTest = {}
  const asyncSolOutPuts = {}
  const outputsByLine = rawOutput.split('\n')
  // const outputLinesToTest = outputsByLine.filter(line => line.slice(0, 9) === '$ToTest$:')
  // try to implement reduce or ramda later... see Gabe's comment
  // console.log('unsplit outputsByLine ', outputsByLine)

  const indicesToRemove = [] // for async lines (for testing) that you need to take away
  let noPush = false
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
        noPush = true
      } else if (tag === '#SPECIALTAG123#DONTDISPLAY#') {
        // do nothing
      }
    } else {
      if (noPush) { //dont push if the line before was an asyncbelowflag
        noPush = false
        return
      }
      outputLinesforUser.push(line)
    }
  })
  // console.log('outputLinesforUser earlier', outputLinesforUser)
  // for (let index of indicesToRemove) {
  //   outputLinesforUser[index] = null
  // }
  // console.log('outputLinesforUser after the for loop ', outputLinesforUser)
  // outputLinesforUser = outputLinesforUser.filter(line => line)
  // PSEUDOCODE: for all indicesToRemove... take out of outputLinesforUser (and shift the remaining.. AFTER all removal has done)
  // dont remove until the very end

  // console.log('outputLinesforUser ', outputLinesforUser)

//YES I KNOW THIS IS UGLY AND NOT DRY AND HORRIBLE ABSOLUTELY HORRIBLE... WILL REFACTOR WHEN I HAVE TIME
  const solOutputsValues = solOutput.split('\n')
                            .filter(line => line.split('::')[0] === '#SPECIALTAG123#ToTest#')
                            .map(line => line.split('::')[2].split(' ').join(''))

  const solOutputsByLine = solOutput.split('\n')
  // console.log('solOutputsByLine ', solOutputsByLine)
  solOutputsByLine.forEach((line, idx) => {
    // console.log('splitByColons ', splitbyColons)
    if (line.includes('#SPECIALTAG123#')) {
      const splitbyColons = line.split('::')
      const tag = splitbyColons[0]
      // console.log('tag is ', tag)
      const outputVariableToTest = splitbyColons[1]
      if (tag === '#SPECIALTAG123#ToTest#') {
        // put the the whole split filter map logic for solOutputsValues into here later
      } else if (tag === '#SPECIALTAG123#asyncBelowFlag#') { // you have to separate this out, and you have to loop through again later unfortunately (in the for loop for outputsValuesToTest) because async is below the to tests
        // console.log('in async below tag')
        const key = outputVariableToTest
        const value = solOutputsByLine[idx+1]
        // console.log('key value pair: ',key, ' ', value)
        indicesToRemove.push(idx+1)
        asyncSolOutPuts[key] = value
      }
    } //  no need for outputlines for user
  })

  // console.log('unsplit solOutputsValues ', solOutput)
  // console.log('solOutputsValues ', solOutputsValues)
  // console.log('outputsValuesToTest ', outputsValuesToTest)
  // console.log('asyncLinesToTest ', asyncLinesToTest)
  // console.log('asyncSolOutPuts', asyncSolOutPuts)


  // when yo uhave time.. make outputsValuesToTest and solOutputValues have everything from the start
  // (instead of the whole asyncbelow logic here... have it above?)

  let expectedLines = ''
  let completed = true
  let i
  for (i = 0; i < outputsValuesToTest.length; i++) {
    // the expectedLines is not very dry... fix this asap
    let outputValueToTest = outputsValuesToTest[i]
    let solOutputValueToTest = solOutputsValues[i]
    if (outputValueToTest.includes('#asyncBelowFlag#')) {
      const lookupKey = outputValueToTest.split(':')[1]
      outputValueToTest = asyncLinesToTest[lookupKey]
      solOutputValueToTest = asyncSolOutPuts[lookupKey]
    }
    // console.log('outputValueToTest is ', outputValueToTest)
    // console.log('expected[i] ', expected[i])
    if (expected[i]) {
      if (expected[i].within) {
        if (expected[i].within.proportion) {
          const proportion = expected[i].within.proportion
          const lowerRange = 1 - proportion
          const upperRange = 1 + proportion
          const spread = Math.round(proportion * solOutputValueToTest)
          expectedLines = expectedLines.concat('Expected ', outputsVariablesToTest[i], ' to be:\n', solOutputValueToTest, ' +/- ', spread, '\n... Got:\n', outputValueToTest, '\n\n')
          if (outputValueToTest < solOutputValueToTest * lowerRange || outputValueToTest > solOutputValueToTest * upperRange) {
            completed = false
            // break
          }
        }
      } else if (expected[i].tobe) {
        expectedLines = expectedLines.concat('Expected ', outputsVariablesToTest[i], ' to be:\n', expected[i].tobe, '\n... Got:\n', outputValueToTest, '\n\n')
        console.log('outputsValues to test ', outputValueToTest, 'compared with ', expected[i].tobe)
        if (outputValueToTest !== expected[i].tobe) {
          completed = false
          // break
        }
      }
    } else {
    expectedLines = expectedLines.concat('Expected ', outputsVariablesToTest[i], ' to be:\n', solOutputValueToTest, '\n... Got:\n', outputValueToTest, '\n\n')
      if (outputValueToTest !== solOutputValueToTest){
        completed = false
        // break
      }
    }
  }

  const finalLine = completed ? '\nGood job! You ROCK!' : `\nNot quite.. check the solution if you can't figure it out`
  const evalOutput = expectedLines + finalLine
  const outputForUser = outputLinesforUser.join('\n')
  return {outputForUser, evalOutput, completed}
}
