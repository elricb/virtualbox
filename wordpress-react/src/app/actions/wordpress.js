import { setError } from './errors';
const routes = {
    'pages' : 'http://127.0.0.1:8080/?rest_route=/wp/v2/pages',
    'posts' : 'http://127.0.0.1:8080/?rest_route=/wp/v2/posts',
    'page' : 'http://127.0.0.1:8080/?rest_route=/wp/v2/pages/',
    'post' : 'http://127.0.0.1:8080/?rest_route=/wp/v2/posts/'
};


/**
 * Dispatchers send async data to the reducer
 */
const displayPosts = (posts) => {
    return {
        type: 'WP_POSTS',
        posts
    };
};

const displayPost = (post) => {
    return {
        type: 'WP_POST',
        post
    };
};

const displayPages = (pages) => {
    return {
        type: 'WP_PAGES',
        pages
    };
};

const displayPage = (page) => {
    return {
        type: 'WP_PAGE',
        page
    };
};


/**
 * Wordpress standardized functions
 */
export const wpGet = (_url, _data = {}) => (
    fetch(_url, _data).then(
        response => response.json()
    )
);

/**
 * Wordpress arrays of Urls come in the style of [{embeddable:boolean, href:''}]
 * (get url, get data from url, return as array of data)
 */
export const wpGetArray = (_wpUrls) => {
    let promises = [];

    _wpUrls.map((_wpUrl) => {
        if (_wpUrl && _wpUrl.embeddable && _wpUrl.href) {
            promises.push(wpGet(_wpUrl.href));
        }
    });

    return Promise.all(promises).then((_results) => {
        return _results.filter((result) => (result && result.length));
    });
};

export const wpGetPosts = () => {
    return dispatch => {
        wpGet(routes.posts).then(
            data => dispatch(displayPosts(data))
        ).catch(
            error => dispatch(setError(error))
        );
    };
};

export const wpGetPost = (_postId) => {
    return dispatch => {
        wpGet(routes.post+_postId).then(
            data => dispatch(displayPost(data))
        ).catch(
            error => dispatch(setError(error))
        );
    };
};

export const wpGetPages = () => {
    return dispatch => {
        wpGet(routes.pages).then(
            data => dispatch(displayPosts(data))
        ).catch(
            error => dispatch(setError(error))
        );
    };
};

export const wpCleanPage = () => {
    return dispatch => (
        dispatch(displayPage({}))
    );
};

export const wpGetPage = (_pageId, _all = true) => {
    return dispatch => {
        wpGet(routes.page+_pageId).then(data => {
            if (_all === true) {
                return getReplies(data).then((_pageWithReplies) => (
                    dispatch(displayPage(_pageWithReplies))
                ));
            }

            return dispatch(displayPage(data));
        }).catch(
            error => dispatch(setError(error))
        );
    };
};

const getReplies = (_page = {}) => {
    let replyLinks = _page && _page._links && _page._links.replies ? _page._links.replies : [];

    return wpGetArray(replyLinks).then((replies) => {
        _page.replies = replies;
        return _page;
    });
};
