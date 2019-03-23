import React, { Component } from 'react';
import ToDoItem from './ToDoItem';

class ToDos extends Component {

    deleteToDo(id) {
        this.props.onDelete(id);
    }

    render() {
        let todoItems;
        console.log('this.props.todos', this.props.todos);
        console.log('type ', typeof(this.props.todos));
        if (this.props.todos) {
            todoItems = this.props.todos.map(todo => {
                return (
                    <ToDoItem onDelete={this.deleteToDo.bind(this)} key={todo.title} todo={todo} />
                )
            })
        }

        return (
            <div className="ToDos">
                <h3>Pending ToDos</h3>
                {todoItems}
            </div>
        );
    }
}

export default ToDos;