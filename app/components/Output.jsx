import React, { Component } from 'react'
import {connect} from 'react-redux'

import { Link } from 'react-router-dom'

const Output = (props) => {
  let errors = props.code.errors
  let output = props.code.output
  return (
    <div className = 'large-container'>
        <span className = 'text-center'>OUTPUT:</span><hr/>
        {
          output !== '' &&
          (
            <span>
              <pre>{output}</pre>
            </span>
          )
        }
        {
          errors !== '' &&
          (
            <span>
              <pre className = "text-red">{errors}</pre>
            </span>
          )
        }
    </div>
  )
}

const mapState = (state) => {
  return {
    code: state.code,
  }
}

const mapDispatch = {}

const ConnectedOutput = connect(mapState, mapDispatch)(Output)

export default ConnectedOutput
