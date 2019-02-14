import { combineReducers } from 'redux'
// import { loadingBarReducer } from 'react-redux-loading'

import deliveries from './deliveriesReducer'
import drivers from "./driversReducer";

export default combineReducers({
    deliveries,
    drivers,
    // loadingBar: loadingBarReducer
})