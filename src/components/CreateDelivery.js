import React, { Component, Fragment } from 'react'

class CreateDelivery extends Component {

    render() {
        return (
            <Fragment>
                <main role="main">
                    <h1>Create Delivery</h1>
                    <form action="create.php" method="POST">
                        <div className="form-group row">
                            <label htmlFor="deliveryDate" className="col-sm-2 col-form-label">Date</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="deliveryDate" name="date" value="" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="deliveryName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="deliveryName" name="name" value="" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="deliveryDriver" className="col-sm-2 col-form-label">Driver</label>
                            <div className="col-sm-10">
                                <select className="form-control" id="deliveryDriver" name="driver_id">
                                    <option value="">- Select One -</option>
                                    <option value="1" >Driver 1</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </main>
            </Fragment>
        )
    }
}

export default CreateDelivery