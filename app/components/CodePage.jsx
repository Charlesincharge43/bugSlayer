import React, { Component } from 'react'
import {connect} from 'react-redux'

import CodeForm from './CodeForm'
import Output from './Output'
import ProgressNav from './ProgressNav'
import dbCodes from '../fakeSeed'// delete later

import { init_Codes_AC, get_Code_Output_AC, compile_UserCode_TC } from '../reducers/codes'
import { get_DbCodes_AC } from '../reducers/dbCodes'
import { set_codeIdx_AC } from '../reducers/codeIdx'

class CodePage extends Component {
  constructor() {
    super()
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  componentDidMount() {
    // placeholder.. replace these two with thunk that queries database later
    this.props.get_DbCodes_AC(dbCodes)// I hate how if you take a shortcut like this (see mapdispatch), these are no longer action creators, but the action objects..
    this.props.init_Codes_AC(dbCodes)
    this.props.set_codeIdx_AC(0)
  }

  explain() {

  }

  next() {
    const length = this.props.dbCodes.length
    const codeIdx = this.props.codeIdx
    if (codeIdx < length - 1) {
      this.props.get_Code_Output_AC('')
      this.props.set_codeIdx_AC(this.props.codeIdx + 1)
    }
  }

  prev() {
    if (this.props.codeIdx) {
      this.props.get_Code_Output_AC('')
      this.props.set_codeIdx_AC(this.props.codeIdx - 1)
    }
  }

  render() {
    return (
      <div>
        <h2 className='text-center slim_tb_margins'>What's wrong with my code?</h2>
        <ProgressNav next={this.next} prev={this.prev} />
        <div className='code-out-container'>
          <CodeForm />
          <Output />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    dbCodes: state.dbCodes,
    codeIdx: state.codeIdx,
  }
}
const mapDispatch = { get_DbCodes_AC, set_codeIdx_AC, get_Code_Output_AC, init_Codes_AC }

const ConnectedCodePage = connect(mapState, mapDispatch)(CodePage)

export default ConnectedCodePage
