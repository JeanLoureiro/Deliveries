import { FETCH_DRIVERS } from '../actions/driversAction'

export default function drivers( state = null, action ){
    switch (action.type) {
        case FETCH_DRIVERS:
            return {
                ...state,
                ...action.drivers
            }
            
        default:
            return state
    }
}