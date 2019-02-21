import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchDrivers } from '../actions/driversAction'
import { fetchDeliveries } from '../actions/deliveriesAction'
import { addDelivery } from '../actions/deliveriesAction'

class CreateDelivery extends Component {

    state = {
        date: '',
        name: '',
        driver_id: 0,
        nextId: null
    }

    handleInputChange = (e) => {
        const { value, name } = e.target

        this.setState(() => ({
            [name]: value
        }))

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addDelivery(this.state)    
        this.props.history.push('/')
    }


    componentDidMount() {
        this.props.fetchDrivers()
        this.props.fetchDeliveries()

    }

    componentDidUpdate( prevProps, prevState ){

        if ( prevProps.deliveries && prevProps.deliveries.nextId !== prevState.nextId ){
            this.setState({
                nextId: prevProps.deliveries.nextId
            })
        }
    }

    render() {

        const { date, name, driver_id } = this.state
        const { drivers } = this.props

        return (
            <Fragment>
                <main role='main'>
                    <h1>Create Delivery</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group row'>
                            <label htmlFor='deliveryDate' className='col-sm-2 col-form-label'>Date</label>
                            <div className='col-sm-10'>
                                <input
                                    type='text'
                                    onChange={this.handleInputChange}
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
                                    onChange={this.handleInputChange}
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
                                    defaultValue={driver_id}
                                >
                                    <option value="">- Select One -</option>
                                    {
                                        drivers
                                            ? Object.keys(drivers).map(item =>
                                                <option
                                                    key={item}
                                                    value={item}
                                                >{drivers[item].name}</option>
                                            )
                                            : null
                                    }
                                </select>
                            </div>
                        </div>
                        <button className='btn btn-primary'>Create</button>
                    </form>
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
        addDelivery: (delivery) => {
            dispatch(addDelivery(delivery))
        },
        fetchDrivers: () => {
            dispatch(fetchDrivers())
        },
        fetchDeliveries: () => {
            dispatch(fetchDeliveries())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDelivery)
