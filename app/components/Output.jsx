import React, { Component } from 'react'
import {connect} from 'react-redux'

import { Link } from 'react-router-dom'

const Output = (props) => {
  const codeIdx = props.codeIdx
  const codes = props.codes
  const currentCode = codes[codeIdx]
  const completed = currentCode && currentCode.completed
  const errors = currentCode ? currentCode.errors : ''
  const outputForUser = currentCode ? currentCode.outputForUser : ''
  const evalOutput = currentCode ? currentCode.evalOutput : ''
  const status = props.status
  return (
    <div className = 'large-container'>
        <span className = 'text-center'>OUTPUT:</span><hr/>

        <span>
          {status === 'compiling_short' && <h4 className='blink_me'> Compiling User Code... </h4>}
          {status === 'compiling_long' &&
          <div>
            <h4 className='blink_me'> Testing User and Solution Code, randomizing inputs... </h4>
            <h4 className='blink_me'> Please be patient! </h4>
          </div>}
        </span>

        <span>
        {outputForUser !== '' && <pre>{outputForUser}</pre>}
        {errors !== '' && <pre className = "text-red">{errors}</pre>}
        { evalOutput !== '' && (
          completed ? <pre className = "text-green">{evalOutput}</pre> : <pre className = "text-red">{evalOutput}</pre>
        )}
        </span>

    </div>
  )
}

const mapState = (state) => {
  return {
    codes: state.codes,
    codeIdx: state.codeIdx,
    status: state.status
  }
}

const mapDispatch = {}

const ConnectedOutput = connect(mapState, mapDispatch)(Output)

export default ConnectedOutput
