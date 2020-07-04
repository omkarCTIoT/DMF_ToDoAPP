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
        this.landingPage = React.createRef();
    }

    localStorageSetup() {
        let loginStructure = { "loggedIn": false, "userId": null, "password": null };
        localStorage.setItem('toDo_authentication', JSON.stringify(loginStructure));

        let userList = [];
        localStorage.setItem('toDo_userList', JSON.stringify(userList));

        let projects = [];
        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projects));

        console.log(JSON.parse(localStorage.getItem('toDo_projectDirectory')));
    }


    logOut() {
        let loginStructure = { "loggedIn": false, "userId": null, "password": null };
        localStorage.setItem('toDo_authentication', JSON.stringify(loginStructure));
        this.setState({ loggedIn: false })
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('toDo_authentication')) === null) {
            this.localStorageSetup();
        }

        this.setState({ loggedIn: JSON.parse(localStorage.getItem('toDo_authentication')).loggedIn })

        console.log(JSON.parse(localStorage.getItem('toDo_authentication')));
        console.log(JSON.parse(localStorage.getItem('toDo_userList')));
        console.log(JSON.parse(localStorage.getItem('toDo_projectDirectory')))
    }

    signUpUser(user) {

        let userList = JSON.parse(localStorage.getItem('toDo_userList'));

        userList.push(user);
        localStorage.setItem('toDo_userList', JSON.stringify(userList));
        console.log(user.userId);
        this.setupProjectDirectory(user.userId)
        console.log(JSON.parse(localStorage.getItem('toDo_userList')));
    }

    setupProjectDirectory(userID) {
        let project = {
            "userID": userID,
            "projects": [{
                "name": 'Sample Project',
                "id": 1,
                "toDoList": [{ "title": 'Sample Task 1', "description": null, "state": 'To Do', "task_id": 1 }]
            }]
        }
        let projectArray = [JSON.parse(localStorage.getItem('toDo_projectDirectory'))];

        projectArray.push(project);
        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));

    }

    createNewProject(user){
        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === user).projects;

        userProjects.push({
            "name": 'Sample Project' + userProjects.length + 1 ,
            "id": userProjects.length + 1,
            "toDoList": [{ "title": 'Sample Task 1', "description": null, "state": 'To Do', "task_id": 1 }]
        })

        projectArray.find(e => e.userID === user).projects = userProjects;
        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));
        this.landingPage.current.retrieveUserProject();
        console.log(JSON.parse(localStorage.getItem('toDo_projectDirectory')));

    }

    render() {

        return (
            <Router>
                <Switch>
                    {this.state.loggedIn ?
                        <Route path="/" render={({ history }) => (
                            <LandingPage ref={this.landingPage} createProject={(user) => this.createNewProject(user)} logOut={() => this.logOut()} history={history} />
                        )} /> :
                        <Route path="/">
                            <AuthenticationPage login={() => this.setState({ loggedIn: true })} signUp={(data) => this.signUpUser(data)} />
                        </Route>}


                </Switch>

            </Router>
        );
    }
}

export default RouterElement;