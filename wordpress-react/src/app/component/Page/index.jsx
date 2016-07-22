import { connect } from 'react-redux';
import Component from './Component.jsx';
import { mapStateToProps, mapDispatchToProps } from './Redux.jsx';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
