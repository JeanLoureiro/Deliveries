import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchDrivers } from '../actions/driversAction'
import { fetchDeliveries, editDelivery } from '../actions/deliveriesAction'

class EditDelivery extends Component {

    state = {
        date: '',
        name: '',
        driver_id: 0
    }

    handleInputChange = (e) => {
        const { value, name } = e.target

        this.setState(() => ({
            [name]: value
        }))

    }

    handleSubmit = (e) => {

        const { driver_id } = this.state
        const { match } = this.props

        e.preventDefault()
        this.props.editDelivery(match.params.deliveryId, driver_id )
        this.props.history.push('/')
    }


    componentDidMount() {

        const { match } = this.props

        this.props.fetchDrivers()
        this.props.fetchDeliveries()

        fetch(`http://localhost:8000/api/deliveries.php?id=${match.params.deliveryId}`)
            .then( res => res.json() )
            .then( delivery => this.setState({
                date: delivery.date,
                name: delivery.name,
                driver_id: delivery.driver_id
            }))

    }

    render() {

        const { date, name, driver_id } = this.state
        const { drivers } = this.props

        return (
            <Fragment>
                <main role='main'>
                    <h1>Edit Delivery</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group row'>
                            <label htmlFor='deliveryDate' className='col-sm-2 col-form-label'>Date</label>
                            <div className='col-sm-10'>
                                <input
                                    type='text'
                                    readOnly
                                    className='form-control'
                                    id='deliveryDate'
                                    name='date'
                                    value={date} />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='deliveryName' className='col-sm-2 col-form-label'>Name</label>
                            <div className='col-sm-10'>
                                <input
                                    type='text'
                                    readOnly
                                    className='form-control'
                                    id='deliveryName'
                                    name='name'
                                    value={name} />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='deliveryDriver' className='col-sm-2 col-form-label'>Driver</label>
                            <div className='col-sm-10'>
                                <select
                                    className='form-control'
                                    onChange={this.handleInputChange}
                                    id='deliveryDriver'
                                    name='driver_id'
                                    value={ driver_id }>
                                    {
                                        drivers
                                        ? Object.keys(drivers).map( item =>
                                            <option 
                                                key={item} 
                                                value={item}
                                                >{ drivers[item].name }</option>
                                            )
                                        : null
                                    }
                                    
                                </select>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>Update</button>
                    </form>
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // deliveries: state.deliveries,
        drivers: state.drivers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getDeliveryToUpdate: (id) => {
        //     dispatch( getDeliveryToUpdate(id) )
        // },
        fetchDeliveries: () => {
            dispatch(fetchDeliveries())
        },
        fetchDrivers: () => {
            dispatch(fetchDrivers())
        },
        editDelivery: (id, driver_id) => {
            dispatch( editDelivery( id, driver_id ) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(EditDelivery)
