import { connect } from 'react-redux';
import Post from './Post.jsx';
import { mapStateToProps, mapDispatchToProps } from './redux.jsx';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
