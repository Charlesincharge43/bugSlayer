import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  codes: require('./codes').default,
  dbCodes: require('./dbCodes').default,
  codeIdx: require('./codeIdx').default,
  status: require('./status').default,
})

export default rootReducer
