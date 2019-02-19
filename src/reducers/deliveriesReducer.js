import { FETCH_DELIVERIES, DELETE_DELIVERIES, UPDATE_DELIVERIES, ADD_DELIVERIES } from '../actions/deliveriesAction'

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
        
        case UPDATE_DELIVERIES: 
            return{
                ...state,
                [action.id] : {
                    date: action.delivery.date,
                    name: action.delivery.name,
                    driver_id: action.delivery.driver_id
                }  
                
            }
        
        case ADD_DELIVERIES:

            return {
                ...state,
                ...action.delivery
                
            }    
            
        default:
            return state
    }
}
