import axios from 'axios'

//fix the constants ASAP
const GET_CODE_OUTPUT = 'GET_CODE_OUTPUT'
const GET_CODE_ERR = 'GET_CODE_ERR'

//-------------------------------- ACTION CREATORS ------
export const get_Code_Output_AC = output => ({
  type: GET_CODE_OUTPUT,
  output
})

export const get_Code_Err_AC = errors => ({
  type: GET_CODE_ERR,
  errors
})

//-------------------------------- THUNK CREATORS ------

export const compile_UserCode_TC = userCode => {
  return function thunk(dispatch){
    return axios.post(`/api/compile`, {code: userCode})
      .then(res => {
        let data = res.data //data looks like this {output:data, langid: language,code:code, errors:err, time:exec_time} (see compile.js)
        let output = data.output
        let err = data.errors
        // console.log('data is ', data)
        console.log('output: ', output)
        console.log('err: ', err)
        dispatch(get_Code_Output_AC(output))
        dispatch(get_Code_Err_AC(err))
      })
      .catch(console.log)
  }
}

//-------------------------------- REDUCER AND INITIAL STATE ------

let initialState = {
  output: '',
  errors: '',
}

const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
  case GET_CODE_OUTPUT:
    newState.output = action.output
    return newState
  case GET_CODE_ERR:
    newState.errors = action.errors
    return newState
  default:
    return prevState
  }
}

export default reducer
