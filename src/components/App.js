import React, { Component } from 'react';
import Header from './Header'
import DeliveriesList from './DeliveriesList'

import '../css/App.css'


class App extends Component {
    render() {
        return (
            <div className='container'>
                <Header />
                <DeliveriesList />
            </div>    
        )
    }
}

export default App