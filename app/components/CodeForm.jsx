import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'//https://github.com/JedWatson/react-codemirror/
import 'codemirror/mode/javascript/javascript'//just FYI, leaving out from just makes this module available to webpack (as like a global..) .. doesn't save to a variable?  Clarify about this later
import {connect} from 'react-redux'

import { compile_UserCode_TC } from '../reducers/code'

// import brace from 'brace';
// import AceEditor from 'react-ace';
//
// import 'brace/mode/java';
// import 'brace/theme/github';
// You can use AceEditor if you figure out some way for the code to be color coded

class CodeForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      userCode: '',
      render: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAttempt = this.handleAttempt.bind(this)
    this.handleSolution = this.handleSolution.bind(this)
  }

  handleChange(userCode){
    this.setState({userCode: userCode})
  }

  handleAttempt(e){
    e.preventDefault()
    this.props.compile_UserCode_TC(this.state.userCode)
  }

  handleSolution(e){
    e.preventDefault()
    this.props.explain()
  }

  componentWillReceiveProps(nextProps){// WHY IS THIS RUNNING ONLY ONCE?  WHY BOTH THINGS UPDATED AT ONCE
    console.log('next Props ', nextProps)
    console.log(nextProps.dbCurrentCode)
    if (nextProps.dbCurrentCode !== this.props.dbCurrentCode) {
      console.log(this.props.dbCodes)//IF WERE TO HAPPEN TWICE, THIS.PROPS.DBCODES SHOULD BE NULL FIRST TIME, AND 0 THE SECOND TIME
      console.log(nextProps.dbCodes[nextProps.dbCurrentCode].starting)
      this.setState({ userCode: nextProps.dbCodes[nextProps.dbCurrentCode].starting, render: false }, () => { this.setState({ render: true }) })
      //this is necessary because stupid CodeMirror will not re-render even if you pass in new value props...
      //so you have to un-render that element and then re-render it.
    }
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  render(){
    console.log('array ', this.props.dbCodes)
    console.log('current code', this.props.dbCurrentCode)
    let options = {
      lineNumbers: true,
      mode: 'javascript',
     }

    return (
      <div className='code-mirror-container'>
        {this.state.render && <CodeMirror value={this.state.userCode} onChange={this.handleChange} options={options} />}
        {/* <AceEditor
          readOnly = {false}
          mode="javascript"
          theme="github"
          onChange={this.handleChange}
          name="UNIQUE_ID_OF_DIV"
          value={this.state.userCode}
          editorProps={{$blockScrolling: true}}
        /> */}
        <button type="submit" className="btn btn-primary" onClick={this.handleAttempt}>Attempt</button>
        <button type="submit" className="btn btn-primary" onClick={this.handleSolution}>Solution</button>
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
const mapDispatch = { compile_UserCode_TC }

const ConnectedCodeForm = connect(mapState, mapDispatch)(CodeForm)

export default ConnectedCodeForm
