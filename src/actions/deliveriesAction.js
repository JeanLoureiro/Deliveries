export const FETCH_DELIVERIES = 'FETCH_DELIVERIES'
export const ADD_DELIVERIES = 'ADD_DELIVERIES'
export const DELETE_DELIVERIES = 'DELETE_DELIVERIES'
export const EDIT_DELIVERIES = 'EDIT_DELIVERIES'


const getDeliveries = (deliveries) => ({
    type: FETCH_DELIVERIES,
    deliveries
})

const removeDelivery = (id) => ({
    type: DELETE_DELIVERIES,
    id
})

export function fetchDeliveries() {
    return dispatch => {
        return fetch('http://localhost:8000/api/deliveries.php')
            .then( res => res.json() )
            .then(deliveries => dispatch(getDeliveries(deliveries)))
            .catch(err => console.log('Error: ', err))
    }
}

export function deleteDelivery(id) {

    return dispatch => {
        return fetch(`http://localhost:8000/api/deliveries.php?id=${id}`,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type' : 'application/json'
            }
        })
            .then( res => res.json() )
            .then( () => dispatch( removeDelivery( id ) ) )
            .catch(err => console.log( 'Could not delete the item: ', err ) )
    }
}

