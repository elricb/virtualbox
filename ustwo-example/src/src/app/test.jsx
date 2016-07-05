import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render () {
        return (
            <div>
                <h1>Vagrant React Example</h1>
                <p>Hello World!</p>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.body);
