import {getPosts} from 'actions/posts';


export const mapStateToProps = (state) => {
    return {
        posts: state.posts  //state is populated asynchronously from the action
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onGetPostsClick: (id) => {
            dispatch(getPosts(id));
        }
    };
};
