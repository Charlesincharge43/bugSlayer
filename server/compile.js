'use strict'

const db = require('APP/db')

const runSandBox = require('../docker/runSandBox')
const composeSandBox = require('../docker/composeSandBox')
const runSandBoxCodeSet = require('../docker/runSandBoxCodeSet')

module.exports = require('express').Router()
  .post('/singleCode', // simply compiles a set of code and responds with sandbox output
    (req, res, next) => {
      let code = req.body.code
      let sandBoxPromise = runSandBox({code})
      sandBoxPromise.then(resolved => res.json(resolved))
    })
  .post('/codeSet', // for composing and running prepending code, solution code, and user code
  // (the results of the same prepending code should be applied to solution code and user code)
  (req, res, next) => {
    // WORK ON THIS
    const appendingCode = req.body.appendingCode
    const userCode = req.body.userCode + appendingCode
    const solutionCode = req.body.solutionCode + appendingCode
    const prependingCode = req.body.prependingCode

    runSandBoxCodeSet({prependingCode, solutionCode, userCode})
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
