import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import logo from '../logo.svg';
import '../App.css';
import TodoTable from '../TodoTable';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { description: '', date: '', todos: [] }

    }

    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    dateChanged = (event, date) => {
        this.setState({ date: date });
    }

    addTodo = (event) => {
        event.preventDefault();
        const strDate = this.state.date.getDate() +
            "." + (this.state.date.getMonth() + 1) +
            "." + this.state.date.getFullYear();
        const newTodo = { description: this.state.description, date: strDate };
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    deleteTodo = (event) => {
        console.log('Delete is called');
        let newTodos = this.state.todos.filter((todo, i) => i !== +event.target.id);
        this.setState({
            todos: newTodos
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo2" alt="logo" />
                    <img src={logo} className="App-logo" alt="logo" />
                    <img src={logo} className="App-logo2" alt="logo" />
                    <h1 className="App-title">React TodoList</h1>
                </header>
                <form>
                    <TextField name="description" hintText="Description"
                        onChange={this.inputChanged}
                        value={this.state.description}
                    />
                    <DatePicker name="date" hintText="Due date"
                        onChange={this.dateChanged}
                        value={this.state.date}
                    />
                    <RaisedButton onClick={this.addTodo} primary={true} label="Add" />
                </form>
                <TodoTable todos={this.state.todos} deleteTodo={this.deleteTodo} />
            </div>
        );
    }
}

export default Home;