import React, { Component, Fragment } from 'react'
import '../css/App.css'

class DeliveriesList extends Component {



    render() {
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

                            <tr>
                                <th scope="row"> echo $id</th>
                                <td> echo $delivery->date</td>
                                <td> echo $delivery->name</td>
                                <td> echo $drivers->items->name</td>
                                <td className="text-right">
                                    <a className="btn btn-outline-primary" href="update.php?id=<?php echo $id; ?>">Edit</a>
                                    <a className="btn btn-outline-danger" href="delete.php?id=<?php echo $id; ?>">Delete</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </main>
            </Fragment>
        )
    }
}

export default DeliveriesList