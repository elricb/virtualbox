import { setError } from './errors';

//sends async data to the reducer
export const displayPosts = (posts, id) => {
    return {
        type: 'DISPLAY_POSTS',
        posts,
        id
    };
};

export const getPosts = ({id}) => {
    return dispatch => {
        fetch('http://127.0.0.1:8080/?rest_route=/wp/v2/posts', {}).then(
            response => response.json()
        ).then(
            posts => dispatch(displayPosts(posts, id))
        ).catch(
            error => dispatch(setError(error))
        );
    };
};
