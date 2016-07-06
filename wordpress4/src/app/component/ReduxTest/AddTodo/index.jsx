import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from 'actions'; //should be able to reference root

let AddTodo = ({dispatch}) => {
    let itemNameNode;

    return (
        <div>
            <input ref={node => {
                itemNameNode = node;
            }} />
            <button onClick={(event) => {
                event.preventDefault();
                if (! itemNameNode.value.trim()) {
                    return;
                }
                dispatch(addTodo(itemNameNode.value));
                itemNameNode.value = '';
            }}>
                Add Todo Item
            </button>
        </div>
    );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
