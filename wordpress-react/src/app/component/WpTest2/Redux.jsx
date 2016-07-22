import {wpGetPage} from 'actions/wordpress';


export const mapStateToProps = (state) => {
    return {
        wordpress: state.wordpress  //state is populated asynchronously from the action
    };
};

export const mapDispatchToProps = (dispatch) => {
    const pageDefault = '4'; //window.default;

    return {
        onGetPostsClick: () => {
            dispatch(wpGetPage(pageDefault));
        }
    };
};
