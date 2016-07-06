'use strict';

import React                      from 'react';
import { Router, browserHistory } from 'react-router';
import routes                     from 'component/App/routes';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        function createElement(Component, props) {
            return <Component {...props} pageData={this.props.pageData} />
        }
        return(
            <Router createElement={createElement.bind(this)} routes={routes} history={browserHistory} />
        );
    }
};
