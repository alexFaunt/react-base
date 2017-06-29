import React from 'react'
import { mount } from 'enzyme'
import test from 'tape'

import WrappedTodoList from '../../src/components/TodoList/TodoList'

const TodoList = WrappedTodoList.WrappedComponent

test('TodoList component with no todos renders a placeholder', (t) => {
  t.is(mount(<TodoList />).find('[data-test="placeholder"]').length, 1)
  t.end()
})
