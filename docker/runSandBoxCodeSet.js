const runSandBox = require('../docker/runSandBox')

module.exports = function runSandBoxCodeSet({prependingCode, solutionCode, userCode}){
  // console.log('prependingCode ', prependingCode)
  return runSandBox({code: prependingCode })
    .then(outputObj => {
      console.log('outputObj is ', outputObj)
      const concattedSolutionCode = outputObj.output + solutionCode
      const concattedUserCode = outputObj.output + userCode
      console.log('concatted user code ', concattedUserCode, 'concatted solution code ', concattedSolutionCode)
      return Promise.all([runSandBox({code: concattedUserCode }), runSandBox({code: concattedSolutionCode })])
    })
    .catch(console.error)
}
