import { FETCH_DELIVERIES, DELETE_DELIVERIES, UPDATE_DELIVERIES, ADD_DELIVERIES } from '../actions/deliveriesAction'

export default function deliveries(state = null, action) {
    switch (action.type) {
        case FETCH_DELIVERIES:

            console.log(action)
            return {
                ...state,
                items: action.deliveries,
                nextId: action.nextId
            }

        case DELETE_DELIVERIES:
            return Object.keys(state)
                .filter(item => item !== action.id)
                .reduce((obj, id) => {
                    obj[id] = state[id]
                    return obj
                }, {})

        case UPDATE_DELIVERIES:

            const { items } = state
            const { id } = action
            const { driver_id } = action.delivery

            return {
                ...state,
                items:{
                    ...items,
                    [id]:{
                        ...items[id],
                        driver_id
                    }
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
