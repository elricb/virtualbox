

const posts = (state = {}, action) => {
    switch (action.type) {
        case 'WP_POSTS':
            return {
                ...state,
                posts: action.posts
            };
        case 'WP_POST':
            return {
                ...state,
                post: action.post
            };
        case 'WP_PAGES':
            return {
                ...state,
                pages: action.pages
            };
        case 'WP_PAGE':
            return {
                ...state,
                page: action.page
            };
    }

    return state;
};

export default posts;
