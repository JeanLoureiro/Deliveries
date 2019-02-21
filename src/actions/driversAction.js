export const FETCH_DRIVERS = 'FETCH_DRIVERS'

export const getDrivers = ( drivers ) => {
    return {
        type: FETCH_DRIVERS,
        drivers
    }
}

export function fetchDrivers() {
    return dispatch => {
        return fetch('http://localhost:8000/api/drivers.php')
            .then( res => res.json() )
            .then(drivers => dispatch(getDrivers(drivers)))
            .catch(err => console.log('Could not fetch drivers: ', err))
    }
}