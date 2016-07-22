import React     from 'react';
import {Link}    from 'react-router';


class App extends React.Component {
    render() {
        return (
            <div>
                <h2>404 - Page Not Found</h2>
                <h4>The resource you're looking for is not available</h4>
                <h4><Link to="/">Return to Home Page</Link></h4>
            </div>
        );
    }
}

export default App;
