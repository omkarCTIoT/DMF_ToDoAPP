import React, { Component } from 'react';
import { Button, Container, Col, Modal, Row, Spinner, Form, Accordion } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ProjectTab from '../Components/ProjectTab';
import { Plus, PlusCircle } from 'react-bootstrap-icons';
class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            projects: [],
            showProjectEditor: false,
            projectTitle: null,
            updatingProject: false
        };

    }

    componentDidMount() {
        //this.props.logOut();
        this.setUser();
        this.setState({ updatingProject: true });
        this.retrieveUserProject(JSON.parse(localStorage.getItem('toDo_authentication')).userId);
    }

    retrieveUserProject(currentUser) {
        console.log('Retreive')
        let projectList = JSON.parse(localStorage.getItem('toDo_projectDirectory'));
        this.setState({ projects: projectList.find(e => e.userID === currentUser).projects });

        const update = setTimeout(() => {
            this.setState({ updatingProject: false })
        }, 1000);
        return () => clearTimeout(update);
    }

    setUser() {
        let userList = JSON.parse(localStorage.getItem('toDo_userList'));

        this.setState({ user: userList.find(e => e.userId === JSON.parse(localStorage.getItem('toDo_authentication')).userId) });
    }

    render() {

        return (
            this.state.user !== null ?
                <Container style={{ minHeight: '100vh' }} className="bg-light p-0 m-0 d-flex text-dark flex-column justify-content-top col-12">
                    <Row className="sticky-top bg-dark p-2 d-flex p-0 m-0 text-start col-12 text-white justify-content-between align-items-center">
                        <span className="p-1">
                            <h4 className="text-info" style={{ letterSpacing: 3 }}>ToDo</h4>
                            <h6 style={{ letterSpacing: 1 }}>Good Morning, {this.state.user.firstName}</h6>
                        </span>
                        <span className="p-4">
                            <Button onClick={() => this.props.logOut()} size="sm" className="text-monospace " variant="danger">
                                Sign Out
                        </Button>
                        </span>
                    </Row>
                    <Row style={{ width: '100%' }} className="col-12 p-2 text-start d-flex flex-row m-0 text-monospace">
                        <h4 className="mt-2 p-1">Projects</h4>
                        <Button onClick={() => { this.setState({ showProjectEditor: true }) }} size="sm" className="ml-2" variant="outline-success">
                            <Plus size={30} />
                        </Button>
                        <Accordion style={{ maxHeight: '100vh', overflowX: 'scroll' }} className="col-12 mt-4 p-0" defaultActiveKey={0}>
                            {this.state.updatingProject ? <Spinner className="text-center" animation="grow" variant="warning" /> : this.state.projects.reverse().map((e, i) =>
                                <ProjectTab update={() => this.componentDidMount()} data={e} index={i} currentUser={this.state.user} />)}

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
                                <Button variant="outline-primary" onClick={() => {
                                    this.props.createProject(JSON.parse(localStorage.getItem('toDo_authentication')).userId, this.state.projectTitle);
                                    this.componentDidMount();
                                    this.setState({ showProjectEditor: false, projectTitle: null })
                                }}>Create</Button>
                                <Button variant="outline-dark" onClick={() => { this.setState({ showProjectEditor: false, projectTitle:null }) }}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </Container > : null
        )
    }
}

export default LandingPage;