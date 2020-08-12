import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import SignUpModal from '../Components/SignUpModal';
import { BoxArrowInRight } from 'react-bootstrap-icons';
class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            showSignUpModal: false,
            error: null
        }
    }


    signIn() {
        let userList = JSON.parse(localStorage.getItem('toDo_userList'));
        let user = userList.find(e => e.username === this.state.username);
        console.log(user);
        if (typeof (user) !== 'undefined') {

            if (user.password === this.state.password) {
                let loginData = { "loggedIn": true, "userId": user.userId, "password": user.password };
                localStorage.setItem('toDo_authentication', JSON.stringify(loginData));
                this.props.login();
                this.setState({ error: null });
            } else {
                this.setState({ error: 'Password is incorrect.' })
            }


        } else {
            this.setState({ error: 'Username is not registered.' })
        }

    }

    render() {


        return (
            <Container style={{ minHeight: '30vh' }} className="bg-light p-5 d-flex text-dark flex-column justify-content-around col-lg-4 col-md-8">
                <h2 className="text-info" style={{ letterSpacing: 2 }}>Sign In CI/CD --</h2>
                <Form className="mt-3 text-dark">
                    <Form.Group>
                        <Form.Label><h5>Username</h5></Form.Label>
                        <Form.Control value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                    </Form.Group>
                    {this.state.error !== null ? <h6 className="text-danger">{this.state.error}</h6> : null}
                    <Button disabled={this.state.username === null || this.state.password === null} onClick={() => this.signIn()} variant="primary">
                        <BoxArrowInRight size={30} />
                    </Button>
                </Form>
                <Form >
                    <Form.Group className="mt-5 d-flex flex-row justify-content-between">
                        {/* <Button size="sm" disabled variant="dark">
                            Forgot Password
                    </Button> */}
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