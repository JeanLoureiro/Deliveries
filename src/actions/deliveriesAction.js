export const FETCH_DELIVERIES = 'FETCH_DELIVERIES'
export const ADD_DELIVERIES = 'ADD_DELIVERIES'
export const DELETE_DELIVERIES = 'DELETE_DELIVERIES'
export const UPDATE_DELIVERIES = 'UPDATE_DELIVERIES'


const getDeliveries = (deliveries) => ({
    type: FETCH_DELIVERIES,
    deliveries,
})

const updateDelivery = (id, delivery) => ({
    type: UPDATE_DELIVERIES,
    id,
    delivery
})

const createDelivery = (delivery) => ({
    type: ADD_DELIVERIES,
    delivery
})


const removeDelivery = (id) => ({
    type: DELETE_DELIVERIES,
    id
})

export function fetchDeliveries() {
    return dispatch => {
        return fetch('http://localhost:8000/api/deliveries.php')
            .then(res => res.json())
            .then(deliveries => dispatch(getDeliveries(deliveries)))
            .catch(err => console.log('Error: ', err))
    }
}

export function deleteDelivery(id) {

    return dispatch => {
        return fetch(`http://localhost:8000/api/deliveries.php?id=${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => dispatch(removeDelivery(id)))
            .catch(err => console.log('Could not delete the item: ', err))
    }
}

export function editDelivery(id, driver_id) {

    return dispatch => {
        return fetch(`http://localhost:8000/api/deliveries.php?id=${id}&driver_id=${driver_id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(delivery => dispatch(updateDelivery(id, delivery)))
            .catch(err => console.log('Error on edit delivery: ', err))
    }
}

export function addDelivery(delivery) {

    console.log('Add Delivery: ', delivery)

    return dispatch => {
        return fetch(`http://localhost:8000/api/deliveries.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(delivery),
        })
            .then(res => console.log(res) || res.json())
            .then(delivery => dispatch(createDelivery(delivery)))
            .catch(err => console.log('Could not add delivery: ', err))
    }
}