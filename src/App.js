import React, { Component } from "react";
import ToDos from "./components/ToDos";
import AddToDo from "./components/AddToDo";

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: []
    };
  }


  getTodos() {
    this.setState({
      todos: [
        {
          id: 1,
          title: 'Title 1',
          todo: 'To-Do 1',
          date: 'Date 1'
        },
        {
          id: 2,
          title: 'Title 2',
          todo: 'To-Do 2',
          date: 'Date 2'
        },
        {
          id: 3,
          title: 'Title 3',
          todo: 'To-Do 3',
          date: 'Date 3'
        }
      ]
    });
  }

  componentWillMount() {
    this.getTodos();
  }

  handleAddToDo(todo) {
    //TODO: Save to Firebase
    console.log('todo', todo);
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({
      todos: todos
    });
  }

  handleDeleteToDo(id) {
    //TODO: Delete from Firebase.
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos.splice(index, 1);
    this.setState({
      todos: todos
    });
  }

  render() {
    return (
      <div className="ToDoApp">
        <AddToDo addToDo={this.handleAddToDo.bind(this)} />
        <ToDos todos={this.state.todos} onDelete={this.handleDeleteToDo.bind(this)} />
      </div>
    )
  }
}

export default App;
