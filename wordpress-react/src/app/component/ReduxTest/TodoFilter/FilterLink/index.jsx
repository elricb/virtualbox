import { connect } from 'react-redux'
import { visibilityFilter } from 'actions'

import React, { PropTypes } from 'react';

//
// Link could be in a separate file
//
const Link = ({active, onClick, children}) => {
    if (active === true) {
        return <span>{children}</span>
    }

    return (
        <a href='#' onClick={(e) => {
            e.preventDefault();
            onClick();
        }}>
            {children}
        </a>
    );
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

//
// With this components properties, export a new set of properties to its child
const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

//
// Properties that call dispatch?
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(visibilityFilter(ownProps.filter))
        }
    }
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default FilterLink;
