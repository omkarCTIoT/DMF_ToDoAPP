import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from '../Pages/LandingPage';
import AuthenticationPage from '../Pages/AuthenticationPage';


class RouterElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    localStorageSetup() {
        let loginStructure = { "loggedIn": false, "userId": null, "password": null };
        localStorage.setItem('toDo_authentication', JSON.stringify(loginStructure));

        let userList = [];
        localStorage.setItem('toDo_userList', JSON.stringify(userList));
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('toDo_authentication')) === null) {
            this.localStorageSetup();
        }

        this.setState({ loggedIn: JSON.parse(localStorage.getItem('toDo_authentication')).loggedIn })

        console.log(JSON.parse(localStorage.getItem('toDo_authentication')));
        console.log(JSON.parse(localStorage.getItem('toDo_userList')))
    }

    signUpUser(user) {

        let userList = JSON.parse(localStorage.getItem('toDo_userList'));

        userList.push(user);
        localStorage.setItem('toDo_userList', JSON.stringify(userList));

        console.log(JSON.parse(localStorage.getItem('toDo_userList')));
    }

    render() {

        return (
            <Router>
                <Switch>
                    {this.state.loggedIn ?
                        <Route path="/todo" render={({ history }) => (
                            <LandingPage history={history} />
                        )} /> :
                        <Route path="/">
                            <AuthenticationPage signUp={(data) => this.signUpUser(data)} />
                        </Route>}


                </Switch>

            </Router>
        );
    }
}

export default RouterElement;