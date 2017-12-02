import React from 'react';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-select/dist/react-select.css';
import './styles/style.css';
import './scripts/script';

class App extends React.Component {

    render() {
        return (
            <Routes />
        );
    }

}

export default App;