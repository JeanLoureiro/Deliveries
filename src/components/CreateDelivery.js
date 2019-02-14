import React, { Component, Fragment } from 'react'

class CreateDelivery extends Component {

    state = {
        date: '',
        name: '',
        driver_id: 1
    }

    handleInputChange = (e) => {
        const { value, name } = e.target

        this.setState(() => ({
            [name] : value
        }))

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.history.push('/')
        
    }


    render() {

        const { date, name } = this.state

        return (
            <Fragment>
                <main role='main'>
                    <h1>Create Delivery</h1>
                    <form onSubmit={ this.handleSubmit }>
                        <div className='form-group row'>
                            <label htmlFor='deliveryDate' className='col-sm-2 col-form-label'>Date</label>
                            <div className='col-sm-10'>
                                <input 
                                    type='text' 
                                    onChange={ this.handleInputChange } 
                                    className='form-control' 
                                    id='deliveryDate' 
                                    name='date' 
                                    value={ date } />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='deliveryName' className='col-sm-2 col-form-label'>Name</label>
                            <div className='col-sm-10'>
                                <input 
                                    type='text' 
                                    onChange={ this.handleInputChange }
                                    className='form-control' 
                                    id='deliveryName' 
                                    name='name' 
                                    value={ name } />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='deliveryDriver' className='col-sm-2 col-form-label'>Driver</label>
                            <div className='col-sm-10'>
                                <select 
                                    className='form-control' 
                                    onChange={ this.handleInputChange }
                                    id='deliveryDriver' 
                                    name='driver_id'>
                                    <option defaultValue=''>- Select One -</option>
                                    <option value='1' >Driver 1</option>
                                </select>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>Create</button>
                    </form>
                </main>
            </Fragment>
        )
    }
}

export default CreateDelivery