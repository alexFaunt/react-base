import React from 'react'
import { connect } from 'react-redux'
import { addTodo as addTodoAction } from '../../actions/todoActions'

// import styles from './AddTodo.css'
const styles = {}
const submitTodo = (addTodo) => (event) => {
  event.preventDefault()
  addTodo(event.target.querySelector('input').value)
}
const AddTodo = ({ addTodo }) => (
  <form className={ styles.wrapper } onSubmit={ submitTodo(addTodo) }>
    <label htmlFor="add">
      <span>Add Todo</span>
      <input id="add" name="add" type="text" />
    </label>
    <button type="submit">Submit</button>
  </form>
)

export default connect(() => ({}), { addTodo: addTodoAction })(AddTodo)
