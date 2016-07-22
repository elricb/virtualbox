import {wpGetPage} from 'actions/wordpress';


export const mapStateToProps = (state, route) => {
    const page       = state.wordpress.page ? state.wordpress.page : {},
          pageHtml   = page.content && page.content.rendered ? page.content.rendered : '',
          pageId     = route.params && route.params.pageId ? route.params.pageId : null,
          //if no route specified, or loaded page equal to route
          pageLoaded = pageId === null || page.id == pageId;

    return {
        pageId,
        page,
        pageHtml,
        pageLoaded
    };
};

export const mapDispatchToProps = (dispatch, route) => {
    const pageId = route && route.routeParams && route.routeParams.pageId;

    return {
        loadPage: () => {
            dispatch(wpGetPage(pageId));
        }
    };
};
