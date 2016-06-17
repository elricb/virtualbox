import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeComponent from './component/AwesomeComponent';
// ...
class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Vagrant React Example</h1>
        <p>Hello World!</p>
        <AwesomeComponent />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
