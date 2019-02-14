export const FETCH_DELIVERIES = 'FETCH_DELIVERIES'
export const ADD_DELIVERIES = 'ADD_DELIVERIES'
export const DELETE_DELIVERIES = 'DELETE_DELIVERIES'
export const EDIT_DELIVERIES = 'EDIT_DELIVERIES'


const getDeliveries = (deliveries) => ({
    type: FETCH_DELIVERIES,
    deliveries
})

export function fetchDeliveries() {
    return dispatch => {
        return fetch('http://localhost:8000/api/deliveries.php')
            .then( res => res.json() )
            .then(deliveries => dispatch(getDeliveries(deliveries)))
            .catch(err => console.log('Error: ', err))
    }
}