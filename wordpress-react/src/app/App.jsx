import React     from 'react';
import {Link}    from 'react-router';
// import ReduxTest from './component/ReduxTest';
// import WpTest    from './component/WpTest';
import WpTest2   from './component/WpTest2';
import NavLink   from './component/NavLink';
import './index.scss';

export default (props) => (
    <div>
        <h2>React Tests</h2>
        <ul className="menu">
            <li>
                <a href="http://campus.codeschool.com/courses/powering-up-with-react/level/2/section/1/building-an-app">course</a>
            </li>
            <li>
                <Link to="/test">Test</Link>
            </li>
            <li>
                <NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/reduxTest">Redux Test</NavLink>
            </li>
            <li>
                <NavLink to="/wpTest">WP Test</NavLink>
            </li>
            <li>
                <NavLink to="/page/4">Page 4</NavLink>
            </li>
            <li>
                <NavLink to="/page/2">Page 2</NavLink>
            </li>
        </ul>
        <div>
            {props.children}
        </div>
        <WpTest2 />
    </div>
);
