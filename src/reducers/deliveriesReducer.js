import { FETCH_DELIVERIES, DELETE_DELIVERIES } from '../actions/deliveriesAction'

export default function deliveries( state = null , action ){
    switch (action.type) {
        case FETCH_DELIVERIES:
            return {
                ...state,
                ...action.deliveries
            }

        case DELETE_DELIVERIES:
            return Object.keys(state)
                    .filter( item => item !== action.id )
                    .reduce( ( obj, id ) => {
                        obj[id] = state[id]
                        return obj
                    }, {})
        
            
        default:
            return state
    }
}
