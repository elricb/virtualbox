

const posts = (state = {}, action) => {
    switch (action.type) {
        case 'DISPLAY_POSTS':
            return {
                ...state,
                posts: action.posts
            };
    }

    return state;
};

export default posts;
