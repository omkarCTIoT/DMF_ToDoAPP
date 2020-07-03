import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {


        return (
            <div id="app" style={{ height: '100%', minHeight: '100vh' }} className="bg-dark d-flex flex-column text-center  justify-content-center col-12 h-100">
                <h1>The Near Beer Game</h1>
                <Link to="/game">
                    <Button className="col-2 mx-auto" variant="primary">Start</Button>
                </Link>
            </div>
        )
    }
}

export default LandingPage;