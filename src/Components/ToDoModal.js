
import React, { Component } from 'react';
import { Button, Container, Col, Modal, Badge, Alert, Row, Form, Accordion, Tooltip } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

class ToDoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskColor: 'success',
            showTaskEditor: false,
            edit: false,
            title: null,
            state: null,
            description: null,
            task_id: null
        }
    }

    componentDidMount() {

        if (!this.props.create) {
            this.setState({ title: this.props.data.title, state: this.props.data.state, description: this.props.data.description, task_id: this.props.data.task_id });

            this.updateState()
        }


    }

    updateState() {
        if (this.state.state === "In Progress") {
            this.setState({ taskColor: 'success' })
        } else if (this.state.state === "To Do") {
            this.setState({ taskColor: 'warning' })
        } else if (this.state.state === "Done") {
            this.setState({ taskColor: 'primary' })
        }
    }

    resetTaskDetails() {
        this.setState({ title: null, state: "To Do", description: null })
    }

    render() {

        return (
            this.props.create ?
                <Modal size="lg" centered show={this.props.showTaskCreator} onHide={() => { this.props.closeTaskCreator(); this.resetTaskDetails() }}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-info" style={{ letterSpacing: 2 }}>Creating Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="text-dark">
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label><h5>Title:</h5></Form.Label>
                                        <Form.Control onChange={(e) => this.setState({ title: e.target.value })}
                                            value={this.state.title} placeholder="Title" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label><h5>State:</h5></Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2"
                                            custom
                                            value={this.state.state}
                                            onChange={(e) => this.setState({ state: e.target.value })} >
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </Form.Control>

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label><h5>Description:</h5></Form.Label>
                                        <Form.Control rows="5" as="textarea" onChange={(e) => this.setState({ description: e.target.value })} value={this.state.description} placeholder="Description" />
                                    </Form.Group>
                                </Col>

                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {<Button variant="outline-success" onClick={() => { this.props.createTask(this.state.title, this.state.description, this.state.state); this.props.closeTaskCreator(); this.resetTaskDetails(); }}>Create</Button>}
                        {<Button variant="outline-dark" onClick={() => { this.props.closeTaskCreator(); this.resetTaskDetails() }}>Cancel</Button>}
                    </Modal.Footer>
                </Modal> :

                <Modal size="lg" centered show={this.props.showTaskEditor} onHide={() => this.props.closeTaskEditor()}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-info" style={{ letterSpacing: 2 }}>Task Editor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="text-dark">
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label><h5>Title:</h5></Form.Label>
                                        <Form.Control
                                            readOnly={!this.state.edit}
                                            onChange={(e) => this.setState({ title: e.target.value })}
                                            value={this.state.title} placeholder="Title" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label><h5>State:</h5></Form.Label>
                                        {this.state.edit ? <Form.Control
                                            as="select"
                                            className="mr-sm-2"
                                            custom
                                            value={this.state.state}
                                            onChange={(e) => { this.setState({ state: e.target.value }) }}
                                        >
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </Form.Control> : <Button className="ml-3" variant={this.state.taskColor}>{this.state.state}</Button>}

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label><h5>Description:</h5></Form.Label>
                                        <Form.Control rows="5" as="textarea" readOnly={!this.state.edit} onChange={(e) => this.setState({ description: e.target.value })} value={this.state.description} placeholder="Description" />
                                    </Form.Group>
                                </Col>

                            </Row>
                            {this.state.error !== null ? <h6 className="text-danger">{this.state.error}</h6> : null}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {!this.state.edit ? <Button variant="outline-primary" onClick={() => { this.setState({ edit: true }) }}>Edit</Button> : <Button variant="outline-success" onClick={() => { this.setState({ edit: false }); this.props.editTask(this.state.task_id, this.state.title, this.state.description, this.state.state); this.updateState() }}>Save</Button>}
                        {this.state.edit ? <Button variant="outline-dark" onClick={() => { this.setState({ edit: false }) }}>Cancel</Button> : null}
                    </Modal.Footer>
                </Modal>

        )
    }
}

export default ToDoModal;