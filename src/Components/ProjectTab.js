import React, { Component } from 'react';
import { Button, Container, Col, footer, Badge, Spinner, Card, Row, Accordion, ButtonGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TodoTab from '../Components/TodoTab';
import { Plus, FileMinus } from 'react-bootstrap-icons';
import ToDoModal from '../Components/ToDoModal';
class ProjectTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showTaskCreator: false,
            toDoList: null,
            loading: true
        }
    }

    componentDidMount() {

        this.getToDoList(this.props.currentUser);
        this.setState({ user: this.props.currentUser, loading: false })
    }

    getToDoList(user) {

        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === user.userId).projects;


        let userTodoList = userProjects.find(e => e.id === this.props.data.id).toDoList;

        this.setState({ toDoList: userTodoList });

    }


    createNewTask(title, description, state) {

        this.setState({ loading: true });

        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === this.state.user.userId).projects;

        let userTodoList = userProjects.find(e => e.id === this.props.data.id).toDoList;
        userTodoList.push({ "title": title, "description": description, "state": state, "task_id": userTodoList.length + 1 });

        userProjects.find(e => e.id === this.props.data.id).toDoList = userTodoList;
        projectArray.find(e => e.userID === this.state.user.userId).projects = userProjects;


        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));
        this.setState({ showtaskCreator: false })
        this.getToDoList(this.state.user);
        const update = setTimeout(() => {
            this.setState({ loading: false })
        }, 1300);
        return () => clearTimeout(update);
    }


    deleteTask(task_ID) {
        console.log(task_ID);
        this.setState({ loading: true });

        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === this.state.user.userId).projects;

        let userTodoList = userProjects.find(e => e.id === this.props.data.id).toDoList;
        //userTodoList.push({ "title": title, "description": description, "state": state, "task_id": userTodoList.length + 1 });

        console.log(userTodoList);
        userProjects.find(e => e.id === this.props.data.id).toDoList = userTodoList.filter(item => item.task_id !== task_ID);
        projectArray.find(e => e.userID === this.state.user.userId).projects = userProjects;


        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));
        this.getToDoList(this.state.user);
        const update = setTimeout(() => {
            this.setState({ loading: false })
        }, 1300);
        return () => clearTimeout(update);
    }
    render() {

        return (
            <Card className="border-dark">
                <Accordion.Toggle style={{ cursor: 'pointer' }} className={this.props.index % 2 === 0 ? "bg-dark text-white" : "bg-secondary text-white"} as={Card.Header} eventKey={this.props.index}>
                    <span className="col-12 d-flex justify-content-between">
                        <h5>{this.props.data.name}</h5>
                        <Button size="sm" onClick={() => this.props.deleteProject(this.props.data.id)} className="ml-5 d-flex align-items-center" variant="danger">
                            Delete 
                        </Button>
                    </span>
                    <blockquote className="blockquote mb-0">
                        <footer style={{ fontSize: 12 }} className="text-white blockquote-footer">
                            Project ID: <cite title="Source Title">{this.props.data.id}</cite>
                        </footer>
                    </blockquote>

                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.index}>

                    <Card.Body style={{ minHeight: '300px', maxHeight: '300px', overflowX: 'scroll' }}>

                        <Button size="md" onClick={() => this.setState({ showTaskCreator: true })} className="ml-2  d-flex align-items-center" variant="info">
                            Add Task <Plus className="ml-2" color="white" size={25} />
                        </Button>

                        <Row className="col-12 d-flex flex-row p-0 m-0 justify-content-around">
                            {this.state.loading ?
                                <Row className="d-flex flex-column col-12 align-items-center justify-content-center">
                                    <h3>Loading..</h3>
                                    <Spinner className="text-center" animation="grow" variant="danger" />
                                </Row>
                                :
                                this.state.toDoList.length > 0 ?
                                    this.state.toDoList.reverse().map((e) =>
                                        <TodoTab
                                            deleteTask={(id) => this.deleteTask(id)}
                                            update={() => this.getToDoList(this.state.user)}
                                            projectID={this.props.data.id}
                                            user={this.state.user.userId}
                                            data={e} />) :
                                    <Row className="d-flex mt-3 flex-column col-12 align-items-center justify-content-center">
                                        <h3>No Tasks Created</h3>
                                    </Row>
                            }
                        </Row>
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