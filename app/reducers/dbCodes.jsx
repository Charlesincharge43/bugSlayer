import axios from 'axios'

//fix the constants ASAP
const GET_DBCODES = 'GET_DBCODES'
const SET_DBCURRENTCODE = 'SET_DBCURRENTCODE'

//-------------------------------- ACTION CREATORS ------
export const get_DbCodes_AC = dbCodes => ({
  type: GET_DBCODES,
  dbCodes
})

export const set_DbCurrentCode_AC = dbCurrentCode => ({
  type: SET_DBCURRENTCODE,
  dbCurrentCode
})

//-------------------------------- THUNK CREATORS ------

export const someTC = userCode => {
  return function thunk(dispatch){
  }
}

//-------------------------------- REDUCER AND INITIAL STATE ------

let initialState = {
  dbCodes: [],
  dbCurrentCode: null,
}

const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
  case GET_DBCODES:
    newState.dbCodes = [...action.dbCodes]
    return newState
  case SET_DBCURRENTCODE:
    newState.dbCurrentCode = action.dbCurrentCode
    return newState
  default:
    return prevState
  }
}

export default reducer
