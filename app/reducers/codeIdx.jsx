import axios from 'axios'

//fix the constants ASAP
const SET_CODEIDX = 'SET_CODEIDX'

//-------------------------------- ACTION CREATORS ------

export const set_codeIdx_AC = codeIdx => ({
  type: SET_CODEIDX,
  codeIdx
})

//-------------------------------- REDUCER AND INITIAL STATE ------

const initialState = null

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
  case SET_CODEIDX:
    return action.codeIdx
  default:
    return prevState
  }
}

export default reducer
