import axios from 'axios'

//fix the constants ASAP
const GET_DBCODES = 'GET_DBCODES'

//-------------------------------- ACTION CREATORS ------
export const get_DbCodes_AC = dbCodes => ({
  type: GET_DBCODES,
  dbCodes
})

//-------------------------------- THUNK CREATORS ------

export const someTC = userCode => {
  return function thunk(dispatch){
  }
}

//-------------------------------- REDUCER AND INITIAL STATE ------

const initialState = []

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
  case GET_DBCODES:
    return action.dbCodes
  default:
    return prevState
  }
}

export default reducer
