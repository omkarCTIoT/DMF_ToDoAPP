
import React, { Component } from 'react';
import { Button, Container, Col, Modal, Badge, Alert, Row, Form, Accordion, Tooltip } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

class ToDoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskColor: 'primary',
            showTaskEditor: false,
            edit: false,
            title: null,
            state: 'To Do',
            description: null,
            task_id: null,
            error: null
        }
    }

    componentDidMount() {

        if (!this.props.create) {
            this.setState({ title: this.props.data.title, state: this.props.data.state, description: this.props.data.description, task_id: this.props.data.task_id });
        }
    }

    updateState(state) {

        switch (state) {
            case 'In Progress':
                // code block
                return 'success'
                break;
            case 'To Do':
                return 'warning'
                break;
            case 'Done':
                return 'primary'
                break;
            default:
            // code block
        }

    }

    resetTaskDetails() {

        this.setState({ title: null, state: 'To Do', description: null, error: null })
    }

    createTask() {
        this.props.createTask(this.state.title, this.state.description, this.state.state);
        this.props.closeTaskCreator();
        this.resetTaskDetails();
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
                                        <p className="text-danger">{this.state.error}</p>
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
                        {<Button
                            disabled={this.state.title === null}
                            variant="outline-success"
                            onClick={() => this.createTask()}>
                            Create</Button>}
                        {<Button
                            variant="outline-dark"
                            onClick={() => { this.props.closeTaskCreator(); this.resetTaskDetails() }}>
                            Cancel</Button>}
                    </Modal.Footer>
                </Modal> :

                <Modal size="lg" centered show={this.props.showTaskEditor} onHide={() => { this.props.closeTaskEditor() }}>
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
                                            onChange={(e) => this.setState({ state: e.target.value })}>
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </Form.Control> :
                                            <Button className="ml-3" variant={this.updateState(this.state.state)}>{this.state.state}</Button>}
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
                        {!this.state.edit ? 
                        <Button variant="outline-primary" onClick={() => { this.setState({ edit: true }) }}>Edit</Button> :
                            <Button disabled={this.state.title.length == 0} variant="outline-success" onClick={() => { this.setState({ edit: false }); this.props.editTask(this.state.task_id, this.state.title, this.state.description, this.state.state) }}>Save</Button>}
                        {this.state.edit ? <Button variant="outline-dark" onClick={() => { this.setState({ edit: false }) }}>Cancel</Button> : <Button variant="danger" onClick={() => this.props.deleteTask()}>Delete</Button>}
                    </Modal.Footer>
                </Modal>

        )
    }
}

export default ToDoModal;