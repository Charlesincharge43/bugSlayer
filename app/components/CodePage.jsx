import React, { Component } from 'react'
import {connect} from 'react-redux'

import CodeForm from './CodeForm'
import Output from './Output'
import ProgressNav from './ProgressNav'
import dbCodes from '../fakeSeed'//delete later

import { get_Code_Output_AC, compile_UserCode_TC } from '../reducers/code'
import { get_DbCodes_AC, set_DbCurrentCode_AC } from '../reducers/dbCodes'

class CodePage extends Component {
  constructor(){
    super()
    this.next = this.next.bind(this)
  }

  componentDidMount(){
    // placeholder.. replace these two with thunk that queries database later
    this.props.get_DbCodes_AC(dbCodes)//I hate how if you take a shortcut like this (see mapdispatch), these are no longer action creators, but the action objects..
    this.props.set_DbCurrentCode_AC(0)
  }

  explain(){

  }

  next(){
    console.log("should go to the next")
    this.props.set_DbCurrentCode_AC(this.props.dbCurrentCode + 1)
  }

  prev(){
    console.log("should go to the prev")
    this.props.dbCurrentCode && this.props.set_DbCurrentCode_AC(this.props.dbCurrentCode - 1)
  }

  render(){
    return(
      <div>
        <ProgressNav next={this.next} prev={this.prev} />
        <CodeForm />
        <Output />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    dbCodes: state.dbCodes.dbCodes,
    dbCurrentCode: state.dbCodes.dbCurrentCode,
  }
}
const mapDispatch = { get_DbCodes_AC, set_DbCurrentCode_AC }

const ConnectedCodePage = connect(mapState, mapDispatch)(CodePage)

export default ConnectedCodePage
