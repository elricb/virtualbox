import React, {PropTypes} from 'react';

const Todo = ({completed, text, onClick}) => (
    <li
        onClick={onClick}
        style={{
            cursor: 'pointer',
            textDecoration:
                completed === true
                    ? 'line-through'
                    : 'none'
        }}
    >
        {text}
    </li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;
