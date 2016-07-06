import React from 'react';
import get from 'lodash/get';
import classnames from 'classnames';


const ListItem = () => {
    const {data: post, featured} = this.props;
    const category = get(post, '_embedded.wp:term.0.0', {});
    const classes = classnames(
        'card-item',
        'blog-post-list-item',
        `blog-label-${get(category, 'slug', 'category')}`,
        {featured: featured}
    );
    const excerpt = get(post, 'excerpt.rendered').replace(/<img[^>]*>/g,"");
    const image = getFeaturedImage(post);
    const uri = `/blog/${get(post, 'slug')}`;
    const dummy = function(){};

    return (
        <div className={classes}>
            <a href={uri} onClick={dummy} className="card-image">
                <Rimage wrap="div" sizes={get(image, 'media_details.sizes')} alt={get(image, 'alt_text')}/>
                <ImageHover autoAnim={500} hover={this.state.hover}/>
            </a>
            <div className="card-details">
                <CategoryTag category={get(category, 'name', 'category')}/>
                <h2 className="title">
                    <a href={uri} onClick={Flux.override(uri)} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                        {he.decode(get(post, 'title.rendered'))}
                    </a>
                </h2>
                <BlogPostMetaInformation author={getAuthor(post)} date={get(post, 'date')}/>
                <div className="excerpt" dangerouslySetInnerHTML={{
                    __html: excerpt
                }}/>
                <div className="tail">
                    <a href={uri} onClick={Flux.override(uri)} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>Read more</a>
                </div>
            </div>
        </div>
    );
};
