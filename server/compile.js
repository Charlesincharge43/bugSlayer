'use strict'

const db = require('APP/db')

const runSandBox = require('../docker/runSandBox')
const composeSandBox = require('../docker/composeSandBox')
const runSandBoxCodeSet = require('../docker/runSandBoxCodeSet')

module.exports = require('express').Router()
  .post('/singleCode', // simply compiles a set of code and responds with sandbox output
    (req, res, next) => {
      const code = req.body.code
      console.log('req body is ', req.body)
      const prependingCode = req.body.prependingCode
      const testCode = prependingCode + req.body.code
      console.log('prepending is ', prependingCode)
      console.log('test code is (look for prepending! )', + testCode)
      let sandBoxPromise = runSandBox({code: testCode})
      sandBoxPromise.then(resolved => {
        console.log('resolved is... ', resolved)
        res.json(resolved)
      })
    })
  .post('/codeSet', // for composing and running preRun code, solution code, and user code
  // (the results of the same preRun code should be applied to solution code and user code)
  (req, res, next) => {
    // WORK ON THIS
    const appendingBreakTag = `console.log('#SPECIALTAG123#DONTDISPLAYBELOW#')`
    const appendingCode = req.body.appendingCode
    const prependingCode = req.body.prependingCode
    const userCode = prependingCode + req.body.userCode + appendingBreakTag + appendingCode
    const solutionCode = prependingCode + req.body.solutionCode + appendingBreakTag + appendingCode
    const preRunCode = req.body.preRunCode
    // runSandBoxCodeSet({preRunCode, solutionCode, userCode, prependingCode})
    //   .then(outputArray => {
    //     // console.log('output array is ', outputArray)
    //     res.json({userCodeOut: outputArray[0], solutionCodeOut: outputArray[1]})
    //   })
    //   .catch(console.error)

    runSandBox({.. }) // CHANGE THIS ASAP
      .then(outputArray => {
        // console.log('output array is ', outputArray)
        res.json({userCodeOut: outputArray[0], solutionCodeOut: outputArray[1]})
      })
      .catch(console.error)

    // let composeGraph = req.body.composeGraph
    // composeSandBox(composeGraph)
    //   .then(resolved => res.json(resolved))
  })
  .post('/compose', // for composing and running multiple sandboxes
  (req, res, next) => {
    let composeGraph = req.body.composeGraph
    composeSandBox(composeGraph)
      .then(resolved => res.json(resolved))
  })
