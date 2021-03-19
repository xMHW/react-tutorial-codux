import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import App from './App';
import OtherPage from './OtherPage';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/other/minseong" component={OtherPage}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;