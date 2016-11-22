import React from 'react'
import { connect } from 'react-redux'
// import styles from './TodoList.css'
const styles = {}

const mapStateToProps = ({ todos: { items, list } }) => ({ items, list })
export default connect(mapStateToProps)(({ items, list }) => {
  if (!list || !list.length) {
    return (
      <span data-test="placeholder">No todos yet! :(</span>
    )
  }

  return (
    <div className={ styles.wrapper }>
      <p className={ styles.intro }>Todos:</p>
      <div className={ styles.todos }>
        {
          list.map((todo) => (
            <div key={ todo }>
              <span className={ styles.todo }>{ items[todo] }</span>
            </div>
          ))
        }
      </div>
    </div>
  )
})
