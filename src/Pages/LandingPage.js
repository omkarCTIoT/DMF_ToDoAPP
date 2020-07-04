import React, { Component } from 'react';
import { Button, Container, Col, Modal, Row, Spinner, Form, Accordion, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ProjectTab from '../Components/ProjectTab';
import { Plus, PlusCircle } from 'react-bootstrap-icons';
class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            projects: [
                { name: 'House Work', id: '01', toDoList: [{ title: 'Learn to Cook', description: 'Contrary Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.', state: 'To Do' }, { title: 'Learn to Eat', description: 'hsdgfhsajgdfhgasjhdfghajsfhjasgdh ', state: 'Done' }] },
                { name: 'College Work', id: '23', toDoList: [{ title: 'Learn to Cook', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.', state: 'In Progress ' }, { title: 'Learn to Eat', description: 'hsdgfhsajgdfhgasjhdfghajsfhjasgdh', state: 'In Progress' }] },
                { name: 'Cooking Class', id: '43', toDoList: [{ title: 'Learn to Cook', description: 'hsdgfhsajgdfhgasjhdfghajsfhjasgdh', state: 'To Do' }, { title: 'Learn to Eat', description: 'hsdgfhsajgdfhgasjhdfghajsfhjasgdh', state: 'Done' }] },
                { name: 'Apple Tasks', id: '32', toDoList: [{ title: 'How to Buy an iPhone', description: 'hsdgfhsajgdfhgasjhdfghajsfhjasgdh', state: 'In Progress' }, { title: 'ICE Pack', description: 'hsdgfhsajgdfhgasjhdfghajsfhjasgdh', state: 'Done' }] }
            ],
            showProjectEditor: false,
            projectTitle: null,
            updatingProject: false
        };

    }

    componentDidMount() {

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
                            <h4 className="text-info" style={{ letterSpacing: 3 }}>To Do Application</h4>
                            <h6 style={{ letterSpacing: 1 }}>Good Morning, {this.state.user.firstName + " " + this.state.user.lastName}</h6>
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
                            {this.state.updatingProject ? <Spinner animation="grow" variant="warning" /> : this.state.projects.reverse().map((e, i) =>
                                <ProjectTab data={e} index={i} currentUser={this.state.user} />)}

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