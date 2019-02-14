import { FETCH_DELIVERIES } from '../actions/deliveriesAction'

export default function deliveries( state = {}, action ){
    switch (action.type) {
        case FETCH_DELIVERIES:
            return state
            
    
        default:
            return state
    }
}