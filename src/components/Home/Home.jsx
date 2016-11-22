import React from 'react'
import TodoList from '../TodoList/TodoList'
import AddTodo from '../AddTodo/AddTodo'

const styles = {}
// import styles from './Home.css'

export default () => (
  <section className={ styles.wrapper }>
    <div>
      <TodoList key="1" />
    </div>
    <div>
      <AddTodo key="2" />
    </div>
  </section>
)
