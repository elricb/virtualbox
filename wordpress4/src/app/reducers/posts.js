import DataLoader from 'lib/data-loader';

const ajaxPosts = function(uri, category = 'all', page = 1) {
    results = {};
    url = category === 'all'
        ? `${uri}/posts?per_page=12&page=${page}`
        : `${uri}/posts?per_page=12&category=${category}&page=${page}`;

    DataLoader(url, function(data) {
        results = data;
    });

    return results;
};

const posts = (state, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return ajaxPosts(action.uri);
        default:
            return state;
    }
};
