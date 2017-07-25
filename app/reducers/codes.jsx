import axios from 'axios'
import { set_Status_AC } from './status'

//fix the constants ASAP
const SET_USER_CODE = 'SET_USER_CODE'
const GET_CODE_OUTPUT = 'GET_CODE_OUTPUT'
const GET_SOL_CODE_OUTPUT = 'GET_SOL_CODE_OUTPUT'
const GET_CODE_ERR = 'GET_CODE_ERR'
const GET_OUTPUT_FOR_USER_ONLY = 'GET_OUTPUT_FOR_USER_ONLY'
const GET_CODE_MODOUTPUT = 'GET_CODE_MODOUTPUT'
const INIT_CODES = 'INIT_CODES'

//-------------------------------- ACTION CREATORS ------
export const set_User_Code_AC = (idx, userCode) => ({
  type: SET_USER_CODE,
  idx,
  userCode,
})

export const init_Codes_AC = dbCodes => ({
  type: INIT_CODES,
  dbCodes
})

export const get_Code_Output_AC = (idx, output) => ({
  type: GET_CODE_OUTPUT,
  idx,
  output
})

export const get_Sol_Code_Output_AC = (idx, solOutput) => ({
  type: GET_SOL_CODE_OUTPUT,
  idx,
  solOutput
})

export const get_Code_Err_AC = (idx, errors) => ({
  type: GET_CODE_ERR,
  idx,
  errors
})

export const get_Code_Output_For_User_Only_AC = (idx, outputForUser) => ({
  type: GET_OUTPUT_FOR_USER_ONLY,
  idx,
  outputForUser,
})

export const get_Code_ModOutput_AC = (idx, outputObj) => ({
  type: GET_CODE_MODOUTPUT,
  idx,
  completed: outputObj.completed,
  outputForUser: outputObj.outputForUser,
  evalOutput: outputObj.evalOutput,
})

//-------------------------------- THUNK CREATORS ------

export const compile_UserCode_TC = ({userCode, codeIdx}) => {
  // this is for just running the code (user clicks run button) (no prepending code.. so faster, good for testing)
  return function thunk(dispatch) {
    dispatch(set_User_Code_AC(codeIdx, userCode))
    dispatch(set_Status_AC('compiling_short'))
    return axios.post(`/api/compile/singleCode`, {code: userCode})
      .then(res => {
        let data = res.data // data looks like this {output:data, langid: language,code:code, errors:err, time:exec_time} (see compile.js)
        let outputForUser = data.output
        let err = data.errors
        // console.log('output: ', output)
        // console.log('err: ', err)
        // dispatch(get_Code_Output_AC(codeIdx, output))//this is technically not needed... it's just rawoutput which is used for evaluation
        dispatch(get_Code_Output_For_User_Only_AC(codeIdx, outputForUser))
        dispatch(get_Code_Err_AC(codeIdx, err))
        dispatch(set_Status_AC('resting'))
      })
      .catch(console.log)
  }
}

export const compile_UserCode_Set_TC = ({userCode, solutionCode, prependingCode, appendingCode, codeIdx}) => {
  // this is for attempting to solve a problem (will take longer because will need to compile prepending code, and then user and solution code)
  return function thunk(dispatch) {
    dispatch(set_User_Code_AC(codeIdx, userCode))
    dispatch(set_Status_AC('compiling_long'))
    return axios.post(`/api/compile/codeSet`, {userCode, solutionCode, prependingCode, appendingCode})
      .then(res => {
        const data = res.data // data looks like an object {userCodeOut: {},solutionCodeOut: {}}  (see compile.js)
        // and userCodeOut or solutionCodeOut looks kinda of like {output:data, langid: language,code:code, errors:err, time:exec_time} (see compile.js)
        const output = data.userCodeOut.output
        const solOutput = data.solutionCodeOut.output
        const userCodeErr = data.userCodeOut.errors// didn't make one for solution code... (because assuming solution code always works... may have to change this later..)
        dispatch(get_Code_Output_AC(codeIdx, output))
        dispatch(get_Sol_Code_Output_AC(codeIdx, solOutput))
        dispatch(get_Code_Err_AC(codeIdx, userCodeErr))
        dispatch(set_Status_AC('resting'))
      })
      .catch(console.log)
  }
}

//-------------------------------- REDUCER AND INITIAL STATE ------

const initialState = []

// Do this when you have time: https://egghead.io/lessons/javascript-redux-reducer-composition-with-arrays
// Make reducers that call other reducers!! (instead of having one reducer needing to handle complicated states with nested objects)
const reducer = (prevState = initialState, action) => {
  const newState = prevState.slice()
  let codeEl

  switch (action.type) {
  case INIT_CODES:
    return action.dbCodes.map(dbCodeObj => ({ //initializes codes array in the store after dbCodes are loaded (and INIT_CODES action called)
        userCode: dbCodeObj.startingCode,
        output: '',
        solOutput: '',
        errors: '',
        outputForUser: '',
        evalOutput: '',
        completed: false,
    }))
  case SET_USER_CODE:
    codeEl = Object.assign({}, newState[action.idx])// put all of this at the top of the reducer .. make your code drier
    codeEl.userCode = action.userCode
    newState[action.idx] = codeEl
    return newState
  case GET_CODE_OUTPUT:
    codeEl = Object.assign({}, newState[action.idx])
    codeEl.output = action.output
    newState[action.idx] = codeEl
    return newState
  case GET_SOL_CODE_OUTPUT:
    codeEl = Object.assign({}, newState[action.idx])
    codeEl.solOutput = action.solOutput
    newState[action.idx] = codeEl
    return newState
  case GET_CODE_ERR:
    codeEl = Object.assign({}, newState[action.idx])
    codeEl.errors = action.errors
    newState[action.idx] = codeEl
    return newState
  case GET_OUTPUT_FOR_USER_ONLY:
    codeEl = Object.assign({}, newState[action.idx])
    codeEl.outputForUser = action.outputForUser
    newState[action.idx] = codeEl
    return newState
  case GET_CODE_MODOUTPUT:
    codeEl = Object.assign({}, newState[action.idx])// can also just put action in there, and then delete codeEl.type
    codeEl.completed = action.completed
    codeEl.outputForUser = action.outputForUser
    codeEl.evalOutput = action.evalOutput
    newState[action.idx] = codeEl
    return newState
  default:
    return prevState
  }
}

export default reducer
