import React, { Fragment } from 'react'
import './ToDos.css'
const ToDos = ({ todos, deletePost, editPost }) =>
  todos.map(todo => (
    <Fragment key={todo._id}>
      <h1> {todo.text}</h1>
      <button onClick={() => deletePost(todo._id)}>DELETE</button>
      <button onClick={() => editPost(todo._id)}>EDIT</button>
      <hr />
    </Fragment >
  ))

export default ToDos
