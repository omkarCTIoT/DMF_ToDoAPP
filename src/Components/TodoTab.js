import React, { Component } from 'react';
import { Button, Alert, Badge } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import ToDoModal from '../Components/ToDoModal';

class TodoTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTaskEditor: false,
            taskData: null
        }
    }

    componentDidMount() {
        this.setState({ taskData: this.props.data });
    }

    resetTaskDetails() {
        this.setState({ title: null, state: "To Do", description: null })
    }

    editTask(task_ID, title, description, state, dueDate) {
        let projectArray = JSON.parse(localStorage.getItem('toDo_projectDirectory'));

        let userProjects = projectArray.find(e => e.userID === this.props.user).projects;

        let userTodoList = userProjects.find(e => e.id === this.props.projectID).toDoList;

        let currentTask = userTodoList.find(e => e.task_id === task_ID);
        currentTask = { "title": title, "description": description, "state": state, "task_id": task_ID }


        userTodoList.find(e => e.task_id === task_ID).title = title;
        userTodoList.find(e => e.task_id === task_ID).description = description;
        userTodoList.find(e => e.task_id === task_ID).state = state;
        userTodoList.find(e => e.task_id === task_ID).dueDate = dueDate;

        userProjects.find(e => e.id === this.props.projectID).toDoList = userTodoList;
        projectArray.find(e => e.userID === this.props.user).projects = userProjects;

        localStorage.setItem('toDo_projectDirectory', JSON.stringify(projectArray));

        this.props.update();

    }


    updateState(state) {

        switch (state) {
            case 'In Progress':
                return 'success'
                break;
            case 'To Do':
                return 'warning'
                break;
            case 'Done':
                return 'primary'
                break;
            default:

        }

    }

    render() {

        console.log(this.props.data.dueDate);
        return (
            this.state.taskData === null ? null :
                <Alert className="m-2 col-sm-12  col-md-5 col-lg-3" style={{ maxHeight: '140px', overflowX: 'scroll' }} variant="dark">
                    <Alert.Heading style={{ cursor: 'pointer' }}>
                        <span className="d-flex justify-content-between">
                            <h5 style={{ color: 'royalblue' }} >{this.props.data.title}</h5>
                            <Button variant={this.updateState(this.props.data.state)}>
                                {this.props.data.state}
                            </Button>
                        </span>
                        <hr />
                        <span onClick={() => { this.setState({ showTaskEditor: true }); }} className={this.props.data.dueDate === null ?"d-flex justify-content-end" :"d-flex justify-content-between"}>
 
                            { this.props.data.dueDate !== null ? 
                            <span>
                            <p style={{fontSize:'0.6em'}}>Due Date:
                            <Badge className="d-flex mt-2 justify-content-center align-items-center" 
                            style={{fontSize:'1em'}} pill 
                            variant={new Date(this.props.data.dueDate) < new Date() ?  "danger" :"primary"  }>
                                {this.props.data.dueDate}
                            </Badge></p> </span>: null}
                            <PencilSquare color="black" size={22} />
                        </span>
                    </Alert.Heading>

                    <ToDoModal
                        showTaskEditor={this.state.showTaskEditor}
                        data={this.state.taskData}
                        closeTaskEditor={() => this.setState({ showTaskEditor: false })}
                        create={false}
                        deleteTask={() => this.props.deleteTask(this.props.data.task_id)}
                        editTask={(task_ID, title, description, state, dueDate) => this.editTask(task_ID, title, description, state, dueDate)} />
                </Alert >
        )
    }
}

export default TodoTab;