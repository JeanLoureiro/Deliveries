import { FETCH_DELIVERIES } from '../actions/deliveriesAction'

export default function deliveries( state = null , action ){
    switch (action.type) {
        case FETCH_DELIVERIES:
            return {
                ...state,
                ...action.deliveries
            }
            
        default:
            return state
    }
}