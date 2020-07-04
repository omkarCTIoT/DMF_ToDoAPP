import React, { Component } from 'react';
import { Button, Container, Col, Modal, Badge, Alert, Row, Form, Accordion, Tooltip } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

class TodoTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskColor: 'success',
            showTaskEditor: false,
            edit: false,
            title: null,
            state: null,
            description: null
        }
    }

    componentDidMount() {

        this.setState({ title: this.props.data.title, state: this.props.data.state, description: this.props.data.description })

        if (this.props.data.state === "In Progress") {
            this.setState({ taskColor: 'success' })
        } else if (this.props.data.state === "To Do") {
            this.setState({ taskColor: 'warning' })
        } else if (this.props.data.state === "Done") {
            this.setState({ taskColor: 'primary' })
        }

    }

    render() {

        console.log(this.props.data)

        return (
            <Alert className="m-3" style={{ maxHeight: '150px', overflowX: 'scroll' }} variant="dark">
                <Alert.Heading onClick={() => this.setState({ showTaskEditor: true })} style={{ cursor: 'pointer' }}>
                    <span className="d-flex justify-content-between">
                        <h5 style={{ color: 'royalblue' }} >{this.props.data.title}</h5>
                        <PencilSquare color="black" size={25} />
                    </span>
                    <Badge variant={this.state.taskColor}>{this.props.data.state}</Badge></Alert.Heading>
                <hr />
                <Modal size="lg" centered show={this.state.showTaskEditor} onHide={() => this.setState({ showTaskEditor: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-info" style={{ letterSpacing: 2 }}>Task Editor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="text-dark">
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label><h5>Title:</h5></Form.Label>
                                        <Form.Control readOnly={!this.state.edit} onChange={(e) => this.setState({ title: e.target.value })}
                                            value={this.state.title} placeholder="title" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                        <Form.Label ><h5>State:</h5></Form.Label>
                                        {this.state.edit ? <Form.Control
                                            as="select"
                                            className="mr-sm-2"
                                            custom
                                        >
                                            <option value="1">To Do</option>
                                            <option value="2">In Progress</option>
                                            <option value="3">Done</option>
                                        </Form.Control> : <Button className="ml-3" variant={this.state.taskColor}>{this.props.data.state}</Button>}

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
                        {!this.state.edit ? <Button variant="outline-primary" onClick={() => { this.setState({ edit: true }) }}>Edit</Button> : <Button variant="outline-success" onClick={() => { this.setState({ edit: true }) }}>Save</Button>}
                        {this.state.edit ? <Button variant="outline-primary" onClick={() => { this.setState({ edit: false }) }}>Cancel</Button> : null}
                    </Modal.Footer>
                </Modal>
            </Alert >
        )
    }
}

export default TodoTab;