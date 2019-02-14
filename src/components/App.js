import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import DeliveriesList from './DeliveriesList'
import CreateDelivery from './CreateDelivery'

import '../css/App.css'



class App extends Component {
    render() {
        return (
            <div className='container'>
                <Router>
                    <header className="header clearfix">

                        <nav>
                            <ul className="nav nav-pills float-right">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active">Deliveries</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/create" className="nav-link">New Delivery</Link>
                                </li>
                            </ul>
                        </nav>
                        <h3 className="text-muted">CartonCloud</h3>

                        <Route exact path="/" component={DeliveriesList} />
                        <Route path="/create" component={CreateDelivery} />

                    </header>
                </Router>

            </div>
        )
    }
}

export default App