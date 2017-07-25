import React, { Component } from 'react'
import {connect} from 'react-redux'

const ProgressNav = (props) => {
  const length = props.dbCodes.length
  const currentIdx = props.codeIdx + 1
  let numCompleted = 0
  props.codes.forEach(codeObj => {
    if (codeObj.completed) numCompleted +=1
  })
  return (
    <div>
      <div className="pos-right">
        Completed {numCompleted} out of {length}
      </div>
      <div className="pos-center">
        <button type="submit" className="btn btn-primary" onClick={props.prev}>Prev</button>
        <text className="text-24">{" "+currentIdx+"/"+length+" "}</text>
        {/* <text >{currentIdx}/{length}</text> */}
        <button type="submit" className="btn btn-primary" onClick={props.next}>Next</button>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    codes: state.codes,
    dbCodes: state.dbCodes,
    codeIdx: state.codeIdx,
  }
}
const ConnectedProgressNav = connect(mapState)(ProgressNav)

export default ConnectedProgressNav
