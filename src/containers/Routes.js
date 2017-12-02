import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ElasticSearch from './../components/ElasticSearch/ElasticSearch'
import PageNotFound from './../components/PageNotFound';

class Routes extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ElasticSearch} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        )
    }

}

export default Routes;