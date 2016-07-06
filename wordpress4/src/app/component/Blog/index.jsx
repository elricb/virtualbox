import { connect } from 'react-redux';
import Blog from './Blog.jsx';
import { mapStateToProps, mapDispatchToProps } from './redux.jsx';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog);
