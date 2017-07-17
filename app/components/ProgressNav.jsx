import React, { Component } from 'react'

const ProgressNav = (props) => {
  return (
    <div>
      <div className="pos-center">
        <text>11/19</text>
        <button type="submit" className="btn btn-primary" onClick={props.prev}>Prev</button>
        <button type="submit" className="btn btn-primary" onClick={props.next}>Next</button>
      </div>
    </div>
  )
}

export default ProgressNav
