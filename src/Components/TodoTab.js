import React, { Component } from 'react';
import { Button, Container, Col, DropdownButton, Dropdown, Badge, Alert, Row, Form, Accordion, Tooltip } from 'react-bootstrap';
import { PencilSquare, Justify } from 'react-bootstrap-icons';
import ToDoModal from '../Components/ToDoModal';

class TodoTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskColor: 'success',
            showTaskEditor: false
        }
    }

    componentDidMount() {

        if (this.props.data.state === "In Progress") {
            this.setState({ taskColor: 'success' })
        } else if (this.props.data.state === "To Do") {
            this.setState({ taskColor: 'warning' })
        } else if (this.props.data.state === "Done") {
            this.setState({ taskColor: 'primary' })
        }
    }

    resetTaskDetails() {
        this.setState({ title: null, state: "To Do", description: null })
    }

    editTask() {
        console.log('editing');
    }

    render() {

        return (
            <Alert className="m-3 col-sm-12  col-md-5 col-lg-3" style={{ maxHeight: '150px', overflowX: 'scroll' }} variant="dark">
                <Alert.Heading style={{ cursor: 'pointer' }}>
                    <span  className="d-flex justify-content-between">
                        <h5 style={{ color: 'royalblue' }} >{this.props.data.title}</h5>
                        <DropdownButton variant={this.state.taskColor}  title={this.props.data.state}>
                            <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
                        </DropdownButton>
                    </span>
                    <hr />
                    <span onClick={() => this.setState({ showTaskEditor: true })} className="d-flex justify-content-end">
                        {/* <Badge variant={this.state.taskColor}>{this.props.data.state}</Badge> */}
                        
                        <PencilSquare color="black" size={25} />
                    </span>
                </Alert.Heading>

                <ToDoModal
                    showTaskEditor={this.state.showTaskEditor}
                    data={this.props.data}
                    closeTaskEditor={() => this.setState({ showTaskEditor: false })}
                    create={false}
                    editTask={(title, description, state) => this.editTask(title, description, state)} />
            </Alert >
        )
    }
}

export default TodoTab;