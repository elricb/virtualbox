
export const mapStateToProps = (state, ownProps) => {
    const uri = `/blog/${get(post, 'slug')}`;

    return {
        uri,
        ...ownProps
    };
};

export const mapDispatchToProps = (dispatch) => {
    return null;
};
