import React, { PropTypes } from 'react';

const Component = ({replies}) => {
    return (
        <ul>
            {replies.map((post, i) => (
                <li key={i}>{i}</li>
            ))}
        </ul>
    );
};


export default Component;
