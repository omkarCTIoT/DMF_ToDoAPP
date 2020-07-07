import React, { Component } from 'react';
import { Button, Container, Col, Modal, Row, Spinner, Form, Accordion } from 'react-bootstrap';
import ProjectTab from '../Components/ProjectTab';
import { Plus } from 'react-bootstrap-icons';
class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            projects: [],
            showProjectEditor: false,
            projectTitle: null,
            updatingProject: false,
            projectSearch: ''
        };

    }

    componentDidMount() {
        //this.props.logOut();
        this.setUser();
        this.setState({ updatingProject: true });
        this.retrieveUserProject(JSON.parse(localStorage.getItem('toDo_authentication')).userId);
    }

    createNewProject(user, title) {

        this.setState({ updatingProject: true });

        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === user).projects;

        userProjects.push({
            "name": title,
            "id": userProjects.length + 1,
            "toDoList": []
        })

        projectArray.find(e => e.userID === user).projects = userProjects;
        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));
        this.retrieveUserProject(JSON.parse(localStorage.getItem('toDo_authentication')).userId);
        console.log(JSON.parse(localStorage.getItem('toDo_projectDirectory')));

    }

    deleteProject(projectID) {
        this.setState({ updatingProject: true });

        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === this.state.user.userId).projects;

        projectArray.find(e => e.userID === this.state.user.userId).projects = userProjects.filter(item => item.id !== projectID);

        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));

        this.retrieveUserProject(JSON.parse(localStorage.getItem('toDo_authentication')).userId);
    }

    retrieveUserProject(currentUser) {
        console.log(currentUser)
        let projectList = JSON.parse(localStorage.getItem('toDo_projectDirectory'));
        this.setState({ projects: projectList.find(e => e.userID === currentUser).projects });

        const update = setTimeout(() => {
            this.setState({ updatingProject: false })
        }, 1300);
        return () => clearTimeout(update);
    }

    setUser() {
        let userList = JSON.parse(localStorage.getItem('toDo_userList'));
        this.setState({ user: userList.find(e => e.userId === JSON.parse(localStorage.getItem('toDo_authentication')).userId) });
    }

    renderProjects() {

        if (this.state.projectSearch.length === 0) {
            return this.state.projects.length > 0 ? this.state.projects.reverse().map((e, i) =>
                <ProjectTab
                    deleteProject={(id) => this.deleteProject(id)}
                    update={() => this.componentDidMount()}
                    data={e}
                    index={i}
                    currentUser={this.state.user} />) :
                <Row className="d-flex mt-3 flex-column col-12 align-items-center justify-content-center">
                    <h5>No Projects Created</h5>
                </Row>
        } else {
            return this.state.projects.filter(item => item.name.toLowerCase().includes(this.state.projectSearch.toLowerCase())).length > 0 ? this.state.projects.filter(item => item.name.toLowerCase().includes(this.state.projectSearch.toLowerCase())).reverse().map((e, i) =>
                <ProjectTab
                    deleteProject={(id) => this.deleteProject(id)}
                    update={() => this.componentDidMount()}
                    data={e}
                    index={i}
                    currentUser={this.state.user} />) :
                <Row className="d-flex mt-3 flex-column col-12 align-items-center justify-content-center">
                    <h5>No Projects Found</h5>
                </Row>
        }
    }

    render() {

        return (
            this.state.user !== null ?
                <Container fluid style={{ minHeight: '100vh' }} className="bg-light p-0 m-0 d-flex text-dark flex-column justify-content-top col-12">
                    <Row className="sticky-top bg-dark p-2 d-flex p-0 m-0 text-start col-12 text-white justify-content-between align-items-center">
                        <span className="p-1">
                            <h4 className="text-info" style={{ letterSpacing: 3 }}>ToDo</h4>
                            <h6 style={{ letterSpacing: 1 }}>Good Morning, {this.state.user.firstName}</h6>
                        </span>
                        <span className="p-4">
                            <Button onClick={() => this.props.logOut()} size="sm" className="text-monospace " variant="success">
                                Sign Out
                        </Button>
                        </span>
                    </Row>
                    <Row style={{ width: '100%' }} className="col-12 p-2 text-start d-flex flex-row m-0 text-monospace">
                        <h5 className="mt-2 p-1">Projects</h5>
                        <Row className="d-flex flex-row col-12 justify-content-between">
                            <Button onClick={() => { this.setState({ showProjectEditor: true }) }} size="sm" className="ml-2" variant="outline-success">
                                <Plus size={30} />
                            </Button>
                            <Form.Control value={this.state.projectSearch} onChange={(e) => this.setState({ projectSearch: e.target.value })} className="col-xs-3 col-6" type="text" placeholder="Search for a Project" />
                        </Row>

                        <Accordion style={{ maxHeight: '100vh', overflowX: 'scroll' }} className="col-12 mt-4 p-0" defaultActiveKey={0}>
                            {this.state.updatingProject ?
                                <Row style={{ height: '50vh' }} className="d-flex flex-column col-12 align-items-center justify-content-center">
                                    <Spinner className="text-center p-3" animation="grow" variant="warning" />
                                </Row>
                                : this.renderProjects()}

                        </Accordion>
                        <Modal size="md" centered show={this.state.showProjectEditor} onHide={() => this.setState({ showTaskEditor: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-info" style={{ letterSpacing: 2 }}>Create New Project</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="text-dark">
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label><h5>Title:</h5></Form.Label>
                                                <Form.Control onChange={(e) => this.setState({ projectTitle: e.target.value })}
                                                    value={this.state.projectTitle} placeholder="Project Title" />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    disabled={this.state.projectTitle === null}
                                    variant="outline-primary"
                                    onClick={() => {
                                        this.createNewProject(JSON.parse(localStorage.getItem('toDo_authentication')).userId, this.state.projectTitle);
                                        this.retrieveUserProject(JSON.parse(localStorage.getItem('toDo_authentication')).userId);
                                        this.setState({ showProjectEditor: false, projectTitle: null })
                                    }}>Create</Button>
                                <Button variant="outline-dark" onClick={() => { this.setState({ showProjectEditor: false, projectTitle: null }) }}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </Container > : null
        )
    }
}

export default LandingPage;