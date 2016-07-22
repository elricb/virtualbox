import React, { PropTypes } from 'react';

const Component = ({posts, onGetPostsClick}) => (
    <fieldset>
        <legend>Post Data</legend>
        <p>
            {JSON.stringify(posts)}
        </p>
        <button onClick={onGetPostsClick}>getPosts</button>
    </fieldset>
);


export default Component;
