import React, { Component } from "react";
import ToDos from "./components/ToDos";
import AddToDo from "./components/AddToDo";

const firebase = require('firebase');

const test = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      
      // add your config here
      config: {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
      },
    };
  }
  componentWillMount() {
    firebase.initializeApp(this.state.config);

    var db = firebase.firestore();

    var result = [];

    db.collection("todos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());

            // result.push(doc.id, " => ", doc.data());
            // this.setState({
            //   todos: doc.data()
            // });

            
            // result.push(doc.id,doc.data());

            // result = doc.map(x => {
            //   return [x.id, x.data()];
            // });
        });

        console.log('RESULT', result);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  handleAddToDo(todo) {
    var db = firebase.firestore();

    db.collection("todos").add({
        title: todo.title,
        todo: todo.todo,
        todoDate: todo.todoDate,
        email: 'test@test.com'
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }).finally( () => {
      let todos = this.state.todos;
      todos.push(todo);
      this.setState({
        todos: todos
      });
    });
  }

  handleDeleteToDo(id) {
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos.splice(index, 1);
    this.setState({
      todos: todos
    });

    console.log('ID', id);

    firebase.database().ref('/todos/' + id).remove();
  }

  googleAuth(){
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.

    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(token);
    console.log(user);

    // Extract the necessary fields you want to store
    var name = user.displayName;
    var email = user.email;
    var photo = user.photoURL;


    console.log('Name : ',name);
    console.log('Email : ',email);
    console.log('photoUrl : ',photo);

    var userId = Math.random().toString(36).substring(10);
  
    // Get a reference to the database service
    var database = firebase.database();

    database.ref('/users/').push({
      userId,
      name,
      email,
      photo,
      token
    }).catch(function(error){
      console.log("Database error : ",error);
    });

    
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(error);
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  render() {
    return (
      <div className="ToDoApp">
        <AddToDo addToDo={this.handleAddToDo.bind(this)} />
        {/* <ToDos todos={this.state.todos} onDelete={this.handleDeleteToDo.bind(this)} /> <hr /> */}
        <button onClick={this.googleAuth.bind(this)}>Sign in</button>
      </div>
    )
  }
}

export default App;
