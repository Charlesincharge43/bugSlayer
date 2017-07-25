import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'// https://github.com/JedWatson/react-codemirror/
import 'codemirror/mode/javascript/javascript'// just FYI, leaving out from just makes this module available to webpack (as like a global..) .. doesn't save to a variable?  Clarify about this later
import {connect} from 'react-redux'

import {testAndModify} from '../outputModifier/testAndModify'
import {compile_UserCode_Set_TC, compile_UserCode_TC, get_Code_ModOutput_AC} from '../reducers/codes'

// import brace from 'brace';
// import AceEditor from 'react-ace';
//
// import 'brace/mode/java';
// import 'brace/theme/github';
// You can use AceEditor if you figure out some way for the code to be color coded

class CodeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCode: '',
      render: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAttempt = this.handleAttempt.bind(this)
    this.handleSolution = this.handleSolution.bind(this)
    this.handleRun = this.handleRun.bind(this)
  }

  handleChange(userCode) {
    this.setState({userCode: userCode})
  }

  handleAttempt(e) {
    e.preventDefault()
    const codeIdx = this.props.codeIdx
    const dbCurrentCodeObj = this.props.dbCodes[codeIdx]
    const expected = dbCurrentCodeObj.expected

    // compile prepending code, then concat stdout of prepending code with user and solution code (each) + appending code
    // then evaluate
    this.props.compile_UserCode_Set_TC({
      userCode: this.state.userCode,
      solutionCode: dbCurrentCodeObj.solutionCode,
      prependingCode: dbCurrentCodeObj.prependingCode,
      appendingCode: dbCurrentCodeObj.appendingCode,
      codeIdx: this.props.codeIdx,
    })
    .then(() => {
      const currentCode = this.props.codes[this.props.codeIdx]
      if (currentCode.errors === ''){
        const outputObj = testAndModify({rawOutput: currentCode.output, solOutput: currentCode.solOutput, expected})

        this.props.get_Code_ModOutput_AC(this.props.codeIdx, outputObj)
      }
    })
    .catch(console.err)
  }

  handleRun(e){
    // compile user code (this is just if user wants to test)
    this.props.compile_UserCode_TC({
      userCode: this.state.userCode,
      codeIdx: this.props.codeIdx,
    })
  }

  handleSolution(e) {
    e.preventDefault()
    this.props.explain()
  }

  componentWillReceiveProps(nextProps) { // WHY IS THIS RUNNING ONLY ONCE?  WHY BOTH THINGS UPDATED AT ONCE
    // console.log('next Props ', nextProps)
    // console.log(nextProps.codeIdx)
    if (nextProps.codeIdx !== this.props.codeIdx) {
      // console.log(this.props.codes)// IF WERE TO HAPPEN TWICE, THIS.PROPS.CODES SHOULD BE NULL FIRST TIME, AND 0 THE SECOND TIME
      // console.log(nextProps.codes[nextProps.codeIdx].startingCode)
      this.setState({ userCode: nextProps.codes[nextProps.codeIdx].userCode, render: false }, () => { this.setState({ render: true }) })
      // this is necessary because stupid CodeMirror will not re-render even if you pass in new value props...
      // so you have to un-render that element and then re-render it.
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const options = {
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
        <button type="submit" className="btn btn-primary" onClick={this.handleRun}>Run</button>
        <button type="submit" className="btn btn-primary" onClick={this.handleAttempt}>Attempt</button>
        <button type="submit" className="btn btn-primary" onClick={this.handleSolution}>Solution</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    dbCodes: state.dbCodes,
    codeIdx: state.codeIdx,
    codes: state.codes,
  }
}
const mapDispatch = { compile_UserCode_Set_TC, compile_UserCode_TC, get_Code_ModOutput_AC }

const ConnectedCodeForm = connect(mapState, mapDispatch)(CodeForm)

export default ConnectedCodeForm
