import { FETCH_DRIVERS } from '../actions/driversAction'

export default function drivers( state = {}, action ){
    switch (action.type) {
        case FETCH_DRIVERS:
            return state
            
    
        default:
            return state
    }
}