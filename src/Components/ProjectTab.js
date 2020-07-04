import React, { Component } from 'react';
import { Button, Container, Col, footer, Badge, Alert, Card, Form, Accordion, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TodoTab from '../Components/TodoTab';
import { Plus } from 'react-bootstrap-icons';

class ProjectTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            tasks: [3, 3, 3, 3, 3, 3, 3, 3]
        }
    }

    componentDidMount() {

        this.setState({ user: this.props.currentUser })
    }

    render() {

        return (
            <Card className="border-dark">
                <Accordion.Toggle className={this.props.index % 2 === 0 ? "bg-dark text-white" : "bg-secondary text-white"} as={Card.Header} eventKey={this.props.index}>
                    <span className="col-12 d-flex justify-content-between">
                    <h6>{this.props.data.name} </h6>
                    <Button size="sm" className="ml-2 d-flex align-items-center" variant="info">
                                Add Task <Plus className="ml-2" color="white" size={25} />
                        </Button></span>
                    <blockquote className="blockquote mb-0">
                        <footer style={{fontSize: 12}} className="text-white blockquote-footer">
                            Project ID: <cite title="Source Title">{this.props.data.id}</cite>
                        </footer>
                    </blockquote>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.index}>
                    <Card.Body style={{ minHeight: '300px', maxHeight: '300px', overflowX: 'scroll' }}>

                        {this.props.data.toDoList.map((e, i) => <TodoTab data={e}/>)}


                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }
}

export default ProjectTab;