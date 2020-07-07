import React, { Component } from 'react';
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            username: null,
            password: null,
            userId: null,
            error: null,
        }
    }

    checkUser() {

        let userList = JSON.parse(localStorage.getItem('toDo_userList'));

        if (userList.find(e => e.username === this.state.username)) {
            this.setState({ error: 'Username is not available. Try Again !' })

        } else {
            this.signUpUser();
            this.setState({error: null})
        }

    }

    signUpUser() {

        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            userId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }

        this.props.signUpUser(user);
        this.props.closeModal()
        this.cancelSignUp();

    }

    cancelSignUp() {
        this.setState({
            firstName: null,
            lastName: null,
            username: null,
            password: null,
            userId: null,
            error: null
        })
    }
    render() {

        return (
            <Modal centered show={this.props.showModal} onHide={() => this.props.closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-info" style={{ letterSpacing: 2 }}>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="text-dark">
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label><h6>First Name</h6></Form.Label>
                                    <Form.Control onChange={(e) => this.setState({ firstName: e.target.value })}
                                        value={this.state.firstName} placeholder="First name" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><h6>Last Name</h6></Form.Label>
                                    <Form.Control onChange={(e) => this.setState({ lastName: e.target.value })} value={this.state.lastName} placeholder="Last name" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label><h6>Username</h6></Form.Label>
                                    <Form.Control onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} placeholder="Username" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label><h6>Password</h6></Form.Label>
                                    <Form.Control onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} placeholder="Password" />
                                </Form.Group>
                            </Col>
                        </Row>
                        {this.state.error !== null ? <h6 className="text-danger">{this.state.error}</h6> : null}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" disabled={this.state.firstName === null || this.state.lastName === null || this.state.username === null} onClick={() => { this.checkUser() }}>Done </Button>
                    <Button variant="outline-primary" onClick={() => { this.cancelSignUp(); this.props.closeModal() }}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SignUpModal;