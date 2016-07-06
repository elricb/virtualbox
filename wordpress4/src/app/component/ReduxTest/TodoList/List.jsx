import React, { PropTypes } from 'react';
import Todo from './Todo';

const List = ({todoList, onTodoClick}) => (
    <ul>
        {todoList.map(todo =>
            <Todo
                key={todo.id}
                onClick={() => onTodoClick(todo.id)}
                {...todo}
            />
        )}
    </ul>
);

List.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default List;
