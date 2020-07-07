import React, { Component } from 'react';
import { Button, Container, Col, footer, Badge, Spinner, Card, Row, Accordion, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TodoTab from '../Components/TodoTab';
import { Plus, GripVertical } from 'react-bootstrap-icons';
import ToDoModal from '../Components/ToDoModal';
class ProjectTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showTaskCreator: false,
            toDoList: null
        }
    }

    componentDidMount() {

        this.setState({ user: this.props.currentUser, toDoList: this.props.data.toDoList })
    }


    createNewTask(title, description, state) {

        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === this.state.user.userId).projects;

        let userTodoList = userProjects.find(e => e.id === this.props.data.id).toDoList;
        userTodoList.push({ "title": title, "description": description, "state": state, "task_id": userTodoList.length + 1 });

        userProjects.find(e => e.id === this.props.data.id).toDoList = userTodoList;
        projectArray.find(e => e.userID === this.state.user.userId).projects = userProjects;


        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));
        this.setState({ showtaskCreator: false })

        this.props.update();
        this.componentDidMount();
    }

    render() {

        return (
            <Card className="border-dark">
                <Accordion.Toggle style={{ cursor: 'pointer' }} className={this.props.index % 2 === 0 ? "bg-dark text-white" : "bg-secondary text-white"} as={Card.Header} eventKey={this.props.index}>
                    <span className="col-12 d-flex justify-content-between">
                        <h5>{this.props.data.name}</h5>
                    </span>
                    <blockquote className="blockquote mb-0">
                        <footer style={{ fontSize: 12 }} className="text-white blockquote-footer">
                            Project ID: <cite title="Source Title">{this.props.data.id}</cite>
                        </footer>
                    </blockquote>

                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.index}>
                    <Card.Body style={{ minHeight: '300px', maxHeight: '300px', overflowX: 'scroll' }}>
                        <Button size="md" onClick={() => this.setState({ showTaskCreator: true })} className="ml-2 d-flex align-items-center" variant="info">
                            Add Task <Plus className="ml-2" color="white" size={25} />
                        </Button>
                        {this.state.toDoList === null ? <Col className="col-12 text-center"><Spinner animation="border" /> <p>Loading</p></Col> :
                            <Row className="col-12 d-flex flex-row p-0 m-0 justify-content-around">
                            {this.state.toDoList.reverse().map((e, i) => <TodoTab data={e} />)}
                            </Row>}
                    </Card.Body>
                </Accordion.Collapse>
                <ToDoModal
                    create={true}
                    showTaskCreator={this.state.showTaskCreator}
                    closeTaskCreator={() => this.setState({ showTaskCreator: false })}
                    createTask={(title, description, state) => this.createNewTask(title, description, state)} />
            </Card>
        )
    }
}

export default ProjectTab;