import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"

import '../css/App.css'

import { fetchDeliveries, deleteDelivery } from '../actions/deliveriesAction'
import { fetchDrivers } from '../actions/driversAction'

class DeliveriesList extends Component {

    componentDidMount() {
        this.props.fetchDeliveries()
        this.props.fetchDrivers()
    }

    handleDelete = (id) => {
        this.props.deleteDelivery(id)
    }

    render() {

        const { deliveries, drivers } = this.props

        if (deliveries === null || drivers === null) {
            return 'Loading...'
        }

        return (

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
                        {Object.keys(deliveries.items).map((item) => (
                            <tr key={item}>
                                <th scope='row'> {item} </th>
                                <td> {deliveries.items[item].date}</td>
                                <td> {deliveries.items[item].name}</td>
                                <td> {drivers[deliveries.items[item].driver_id].name}</td>
                                <td className='text-right'>
                                    <NavLink to={`/update/${item}`} className='btn btn-outline-primary'>Edit</NavLink>
                                    <button className='btn btn-outline-danger' onClick={() => this.handleDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>


                </table>
            </main>

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
            dispatch(fetchDeliveries())
        },
        fetchDrivers: () => {
            dispatch(fetchDrivers())
        },
        deleteDelivery: (id) => {
            dispatch(deleteDelivery(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveriesList)