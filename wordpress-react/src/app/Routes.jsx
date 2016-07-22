import React                            from 'react';
import {Route, Router, browserHistory, hashHistory, IndexRoute}  from 'react-router';
import App                              from './App';
import Test                             from './component/Test';
import ReduxTest                        from './component/ReduxTest';
import WpTest                           from './component/WpTest';
import Page                             from './component/Page';
import Home                             from './component/Home';
import PageNotFound                     from './component/PageNotFound';

/**
 * Redux requires Router 3.0 for optimizations - using component lifecycle states for now
 * https://twitter.com/dan_abramov/status/729768048417251328
 */
export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/reduxTest" component={ReduxTest}/>
            <Route path="/wpTest" component={WpTest}/>
            <Route path="/page/:pageId" component={Page}/>
        </Route>
        <Route path="/test" component={Test}/>
        <Route path="*" component={PageNotFound}/>
    </Router>
);
