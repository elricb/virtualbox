import React from 'react';

const Blog = ({ posts }) => {


    return (
        {posts.map((post, index) =>
            <Post
                key={post.slug}
                className='blog-post-list-item'
                featured={index === 0}
                post={post}
            />
        )}
    );
};
