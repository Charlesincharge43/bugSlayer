import axios from 'axios'

//fix the constants ASAP
const SET_STATUS = 'SET_STATUS'

//-------------------------------- ACTION CREATORS ------

export const set_Status_AC = status => ({
  type: SET_STATUS,
  status
})

//-------------------------------- REDUCER AND INITIAL STATE ------

const initialState = 'resting'

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
  case SET_STATUS:
    return action.status
  default:
    return prevState
  }
}

export default reducer
