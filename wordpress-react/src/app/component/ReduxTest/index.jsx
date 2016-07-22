import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import TodoFilter from './TodoFilter';
//
// container component uses presentational components
// Every Container needs a reference to the store object (flows in one direction down)
//
const TodoApp = () => (
    <div>
    <fieldset>
    <legend>Redux Todo Items</legend>
        <AddTodo />
        <TodoFilter />
        <TodoList />
    </fieldset>
    </div>
);

export default TodoApp;
