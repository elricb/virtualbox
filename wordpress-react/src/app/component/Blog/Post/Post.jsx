import React from 'react';
import classnames from 'classnames';


const ListItem = ({ post }) => {
    const classes = classnames(
        'card-item',
        'blog-post-list-item',
        `blog-label-${get(category, 'slug', 'category')}`,
        {featured: featured}
    );

    return (
        <div className={classes}>
            {JSON.stringify(post)}
        </div>
    );
};
