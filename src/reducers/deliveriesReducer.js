import { FETCH_DELIVERIES, DELETE_DELIVERIES, UPDATE_DELIVERIES, ADD_DELIVERIES } from '../actions/deliveriesAction'

export default function deliveries(state = null, action) {
    switch (action.type) {
        case FETCH_DELIVERIES:
            return {
                ...state,
                items: action.deliveries,
                nextId: action.nextId
            }

        case UPDATE_DELIVERIES:

            const { driver_id } = action.delivery

            return {
                ...state,
                items:{
                    ...state.items,
                    [action.id]:{
                        ...state.items[action.id],
                        driver_id
                    }
                }
            }

        case DELETE_DELIVERIES:
            console.log('Delete State: ', state)
            console.log('Delete Action: ', action)
            
            return {
                ...state,
                items: Object.keys(state.items)
                .filter(item => item !== action.id)
                .reduce((obj, id) => {
                    obj[id] = state.items[id]
                    return obj
                }, {})
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
