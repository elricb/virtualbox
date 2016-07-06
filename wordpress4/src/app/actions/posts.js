export const getPosts = ({posts, id}) => {
    return {
        type: 'GET_POSTS',
        id,
        posts
    }
};
