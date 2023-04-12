import React, {Component, useEffect, useLayoutEffect} from 'react';
import './App.css';
import Project from "./components/Project/Project";
import {connect, useDispatch, useSelector} from "react-redux";
import _ from "lodash";


class App extends Component {

    componentDidMount() {
        const { dispatch, listOfTasks } = this.props;

        const tasksString = localStorage.getItem('tasks');
        if (tasksString) {
            dispatch({type: 'CHANGE_TASKS', payload: [...JSON.parse(tasksString)]})
        } else {
            localStorage.setItem('tasks', JSON.stringify(listOfTasks));
        }
    }

    componentDidUpdate(prevProps) {
        const { listOfTasks } = this.props;
        const tasksString = localStorage.getItem('tasks');
        const savedTasks = tasksString ? JSON.parse(tasksString) : null;

        if (savedTasks && !_.isEqual(savedTasks, listOfTasks)) {
            localStorage.setItem('tasks', JSON.stringify(listOfTasks));
        }
    }

    render() {
        return (
            <div className="App">
                <Project/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listOfTasks: state.listOfTasks,
});

export default connect(mapStateToProps)(App);