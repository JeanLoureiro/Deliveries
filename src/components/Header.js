import React, { Component, Fragment } from 'react'
import '../css/App.css'

class Header extends Component {

    render() {
        return (
            <Fragment>
                <header className="header clearfix">
                    <nav>
                        <ul className="nav nav-pills float-right">
                            <li className="nav-item">
                                <a className="nav-link active" href="/">Deliveries</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/create.php">New Delivery</a>
                            </li>
                        </ul>
                    </nav>
                    <h3 className="text-muted">CartonCloud</h3>
                </header>
            </Fragment>    
        )
    }
}

export default Header