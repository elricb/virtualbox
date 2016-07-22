import React, { PropTypes } from 'react';
import Replies from './Replies';

const Component = ({wordpress, onGetPostsClick}) => {
    const pageHtml = wordpress.page ? wordpress.page.content.rendered : '',
          replies  = wordpress.page && wordpress.page.replies ? wordpress.page.replies : [];

    return (
        <fieldset>
            <legend>Post Data from Saga</legend>
            <pre>
                {JSON.stringify(wordpress.page, null, 4)}
            </pre>
            <div dangerouslySetInnerHTML={{__html: pageHtml}} />
            <button onClick={onGetPostsClick}>getPosts</button>
            {() => {
                if (replies.length) {
                    return (
                        <fieldset>
                            <legend>Replies</legend>
                            <Replies replies={replies} />
                        </fieldset>
                    );
                }
            }}
        </fieldset>
    );
};


export default Component;
