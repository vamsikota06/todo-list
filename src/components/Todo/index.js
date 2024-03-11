import {Component} from "react"
import { v4 as uuidv4 } from 'uuid';

import TodoItem from "../TodoItem"

import "./index.css"

class Todo extends Component{
    state = {userInput:"",
            todoList:[],
            totalTasks:0,
    }

    modifyTodo = (id, modifiedTodo, noOfTimesUpdated) => {
        const {todoList} = this.state
        const modifiedTodoList = todoList.map(eachTodo => (
            eachTodo.uniqueId == id ?  {...eachTodo, todo:modifiedTodo, noOfTimesUpdated:noOfTimesUpdated} : eachTodo
        ))

        this.setState({todoList:modifiedTodoList})
    }

    onClickDelete = (id) => {
        const {todoList} = this.state
        const filteredTodoList = todoList.filter(eachTodo => eachTodo.uniqueId !== id)
        this.setState({todoList: filteredTodoList})
    }

    onChangeInputValue = (event) => {
        this.setState({userInput:event.target.value})
    }

    onAddTodo = () => {
        const {userInput} = this.state
        const userInputSplit = userInput.split(" ")
        const userInputLen = userInputSplit.length
        const repeatCount = userInputSplit[userInputLen-1] ? parseInt(userInputSplit[userInputLen-1]) : 1
        userInputSplit.pop()
        const todoStr = userInputSplit.join(" ")
        this.setState((prevState) => ({ totalTasks: prevState.totalTasks + repeatCount }));

        for (let i = 0; i < repeatCount; i++){
            const uniqueId = uuidv4()
            const todoObj = {uniqueId:uniqueId, todo:todoStr, noOfTimesUpdated:0}
            this.setState(prevState => ({todoList: [...prevState.todoList, todoObj]}))
        }
        this.setState({userInput:""})
    }

    render(){
        const {userInput, todoList} = this.state
        //console.log(todoList)
        return(
            <div className="bg-container">
                <div className="main-container">
                    <h1 className="main-heading">Daily Goals!</h1>
                    <div>
                        <input 
                            className="text-input"
                            type="text" 
                            placeholder="Add a todo" 
                            value={userInput}
                            onChange={this.onChangeInputValue}
                            />
                        <button 
                            className="add-todo-button"
                            onClick={this.onAddTodo} 
                            type="button"
                            >Add Todo</button>
                    </div>
                    <ul className="ul-container">{todoList.map(eachTodo => (
                        <TodoItem 
                            key={eachTodo.uniqueId} 
                            todoObj={eachTodo} 
                            onClickDelete={this.onClickDelete}
                            modifyTodo={this.modifyTodo} />
                    ))}</ul>
                </div>
            </div>
        )
    }

}

export default Todo