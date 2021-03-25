import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import App from './App';
import OtherPage from './OtherPage';
import Login from './Login'
import SignUp from './SignUp'

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/other/minseong" component={OtherPage}/>
                    <Route exact path="/Login" component={Login}/>
                    <Route exact path="/Signup" component={SignUp}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;