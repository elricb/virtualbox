import { getPosts } from 'actions/posts.js';


export const mapStateToProps = (state, ownProps) => {
    return {
        isCategorised: ownProps.blogCategory !== 'all',
        isLoadingInitialPosts: true,
        isLoadingMorePosts: false,
        isLoadingCategoryPosts: false,
        posts: getPosts(state.posts, state.id)
    };
};

export const mapDispatchToProps = (dispatch) => {
    return null;
};
