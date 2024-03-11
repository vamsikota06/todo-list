import "./index.css"

import {Component} from "react"

class TodoItem extends Component{
    state = {isUpdating:false, 
            newUserInput: this.props.todoObj.todo,
     }

    onClickRename = () => {
        this.setState(prevState => ({isUpdating:!prevState.isUpdating}))
    }

    onClickUpdate = () => {
        const {todoObj, modifyTodo} = this.props
        const {todo, uniqueId, noOfTimesUpdated} = todoObj
        const {newUserInput} = this.state
        modifyTodo(uniqueId, newUserInput, noOfTimesUpdated + 1)

        this.setState(prevState => ({isUpdating:!prevState.isUpdating}))
    }

    onChangeInputValue = (event) => {
        this.setState({newUserInput:event.target.value})
    }

    render(){
        const {isUpdating, newUserInput} = this.state
        const {todoObj, onClickDelete} = this.props
        const {uniqueId, todo, noOfTimesUpdated} = todoObj
        console.log(isUpdating)

        const todoString = noOfTimesUpdated === 1 ? `${todo} (Changed ${noOfTimesUpdated} time)` : 
                                                    `${todo} (Changed ${noOfTimesUpdated} times)`

        return(
            <li className="list-item">
                <p>{isUpdating ? 
                    (
                    <input className="text-input"
                        type="text" 
                        placeholder="Add a todo" 
                        value={newUserInput}
                        onChange={this.onChangeInputValue}
                    />
                    ) : (
                    todoString
                    )
                }</p>
                <div>{
                    isUpdating ? 
                    (
                    <button 
                        className="rename-button"
                        type="button"
                        onClick={this.onClickUpdate}>update
                    </button>
                    ) : (
                    <button 
                        className="update-button"
                        type="button"
                        onClick={this.onClickRename}>edit
                    </button>
                    )
                    }
                    <button 
                        className="close-button" 
                        onClick={() => onClickDelete(uniqueId)}>x</button>
                </div>
            </li>
        )
    }
}

export default TodoItem