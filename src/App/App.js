import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import ToDo from '../ToDos/ToDos'
import './App.css'

const url = "http://localhost:5959/api/todos/"

export default class App extends Component {

  state = {
    todos: [],
    text: '',
    ID: null // using for handling editing, looking for ADVICE
  }

  fetchData = async () => {
    const { data: todos } = await axios.get(url)
    // adding text: '', ID: null to make fetchData() resuble
    this.setState({ todos, text: '', ID: null })
  }

  async componentDidMount() {
    this.fetchData()
  }

  handleInputChange = e => {
    this.setState({ text: e.target.value })
  }

  addPost = async id => {

    // putting this if statment in another function
    // does not work as expected, no idea why
    if (!this.state.text) {
      Swal('Oops...', "Task should have some text", 'error')
      return
    }
    if (!id) {
      await axios.post(url, { text: this.state.text })
      this.fetchData()
    } else {
      await axios.put(url + id, { text: this.state.text })
      this.fetchData()
    }
  }

  deletePost = async id => {
    await axios.delete(url + id)
    this.fetchData()
  }

  editPost = id => {
    const editToDo = this.state.todos.find(todo => todo._id === id)
    this.setState({
      text: editToDo.text,
      ID: id
    })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleInputChange}
          value={this.state.text} />
        <button onClick={() => this.addPost(this.state.ID)}>
          ADD
        </button>
        <ToDo
          todos={this.state.todos}
          deletePost={this.deletePost}
          editPost={this.editPost} />
      </div>
    );
  }
}
