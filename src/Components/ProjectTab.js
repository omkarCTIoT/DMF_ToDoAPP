import React, { Component } from 'react';
import { Button, Form, Spinner, Card, Row, Accordion } from 'react-bootstrap';
import TodoTab from '../Components/TodoTab';
import { Plus } from 'react-bootstrap-icons';
import ToDoModal from '../Components/ToDoModal';
class ProjectTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showTaskCreator: false,
            toDoList: null,
            loading: true,
            filter: 'Select'
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


    createNewTask(title, description, state, dueDate) {

        this.setState({ loading: true });

        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === this.state.user.userId).projects;

        let userTodoList = userProjects.find(e => e.id === this.props.data.id).toDoList;
        userTodoList.push({ "title": title, "description": description, "state": state, "task_id": userTodoList.length + 1, "dueDate": dueDate });

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

    renderToDoList(){

        if(this.state.filter === 'Select'){
            return this.state.toDoList.reverse().map((e) =>
            <TodoTab
                deleteTask={(id) => this.deleteTask(id)}
                update={() => this.getToDoList(this.state.user)}
                projectID={this.props.data.id}
                user={this.state.user.userId}
                data={e} />)
        } else{

            return this.state.toDoList.filter(item => item.state === this.state.filter).length > 0 ? this.state.toDoList.filter(item => item.state === this.state.filter).reverse().map((e) =>
            <TodoTab
                deleteTask={(id) => this.deleteTask(id)}
                update={() => this.getToDoList(this.state.user)}
                projectID={this.props.data.id}
                user={this.state.user.userId}
                data={e} />) : <Row className="d-flex mt-3 flex-column col-12 align-items-center justify-content-center">
                <h5>No Tasks Found</h5>
            </Row>
        }
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
                        <Row className="flex-row d-flex align-items-start justify-content-between">
                            <Button size="sm" onClick={() => this.setState({ showTaskCreator: true })} className="ml-2  " variant="info">
                                Add Task <Plus className="ml-2" color="white" size={25} />
                            </Button>
                            <Form.Group style={{fontSize:'1em'}} className="p-1 d-none d-sm-flex flex-column">
                                <Form.Label>Filter:</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    value={this.state.filter}
                                    onChange={(e) => { this.setState({ filter: e.target.value }) }} >
                                    <option value="Select">Select</option>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </Form.Control>

                            </Form.Group>
                        </Row>
                        <Row className="col-12 d-flex flex-row p-0 m-0 justify-content-around">
                            {this.state.loading ?
                                <Row className="d-flex flex-column col-12 align-items-center justify-content-center">
                                    <h5 className="mt-5">Loading..</h5>
                                    <Spinner className="text-center" animation="grow" variant="danger" />
                                </Row>
                                :
                                this.state.toDoList.length > 0 ?
                                    this.renderToDoList() :
                                    <Row className="d-flex mt-3 flex-column col-12 align-items-center justify-content-center">
                                        <h5>No Tasks Created</h5>
                                    </Row>
                            }
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
                <ToDoModal
                    create={true}
                    showTaskCreator={this.state.showTaskCreator}
                    closeTaskCreator={() => this.setState({ showTaskCreator: false })}
                    createTask={(title, description, state, dueDate) => this.createNewTask(title, description, state, dueDate)} />
            </Card >
        )
    }
}

export default ProjectTab;