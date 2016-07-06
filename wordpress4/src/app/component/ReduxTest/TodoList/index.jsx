import { connect } from 'react-redux';
import List from './List.jsx';
import { mapStateToProps, mapDispatchToProps } from './redux.jsx';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
