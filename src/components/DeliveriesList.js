import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import '../css/App.css'

import { fetchDeliveries, deleteDelivery } from '../actions/deliveriesAction'
import { fetchDrivers } from '../actions/driversAction'

class DeliveriesList extends Component {

    componentDidMount(){
        this.props.fetchDeliveries()
        this.props.fetchDrivers()
    }

    handleDelete = (id) => {
        this.props.deleteDelivery(id)
    }

    render() {

        const { deliveries, drivers } = this.props

        if ( deliveries === null || drivers === null ){
            return 'Loading...'
        }

        return (
            <Fragment>
                <main role="main">
                    <h1>Deliveries</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Driver</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Object.keys(deliveries).map( (item) => (
                                <tr key={item}>
                                    <th scope='row'> {item} </th>
                                    <td> { deliveries[item].date }</td>
                                    <td> { deliveries[item].name }</td>
                                    <td> { drivers[deliveries[item].driver_id].name }</td>
                                    <td className='text-right'>
                                        <button className='btn btn-outline-primary'>Edit</button>
                                        <button className='btn btn-outline-danger' onClick={ () => this.handleDelete(item) }>Delete</button>
                                    </td>
                                </tr>    
                                ))
                            }
                        </tbody>
                    </table>
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deliveries: state.deliveries,
        drivers: state.drivers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDeliveries: () => {
            dispatch( fetchDeliveries() )
        },
        fetchDrivers: () => {
            dispatch( fetchDrivers() )
        },
        deleteDelivery: (id) => {
            dispatch( deleteDelivery(id) )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveriesList)