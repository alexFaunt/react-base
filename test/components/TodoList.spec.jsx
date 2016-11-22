import React from 'react'
import { mount } from 'enzyme'

import WrappedTodoList from '../../src/components/TodoList/TodoList'

const TodoList = WrappedTodoList.WrappedComponent

describe('A TodoList Component', () => {
  describe('with no todos', () => {
    it('renders a placeholder', () => {
      expect(mount(<TodoList />).find('[data-test="placeholder"]').length).toBe(1)
    })
  })
})
