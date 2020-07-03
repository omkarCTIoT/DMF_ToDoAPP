import React, { Component } from 'react';
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import SignUpModal from '../Components/SignUpModal';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            showSignUpModal: false,
        }
    }

    render() {


        return (
            <Container style={{ minHeight: '30vh' }} className="bg-light p-5 d-flex text-dark flex-column justify-content-around col-lg-4 col-md-8">
                <h2 className="text-info" style={{ letterSpacing: 2 }}>Sign In</h2>
                <Form className="mt-3 text-dark">
                    <Form.Group>
                        <Form.Label><h5>Username</h5></Form.Label>
                        <Form.Control value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button  variant="primary">
                        Sign In
                    </Button>
                </Form>
                <Form >
                    <Form.Group className="mt-5 d-flex flex-row justify-content-between">
                        <Button size="sm" variant="outline-dark">
                            Forgot Password
                    </Button>
                        <Button onClick={() => this.setState({ showSignUpModal: true })} size="sm" variant="outline-dark ">
                            Sign Up
                    </Button>
                    </Form.Group>
                </Form>
                <SignUpModal
                    showModal={this.state.showSignUpModal}
                    closeModal={() => this.setState({ showSignUpModal: false })}
                    signUpUser={(user) => this.props.signUp(user)}
                />
            </Container>
        )
    }
}

export default LandingPage;