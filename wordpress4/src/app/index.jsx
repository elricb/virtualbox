import React from 'react';
import ReactDOM from 'react-dom';
import ReduxTest from './component/ReduxTest'
//Action Store
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import appReducer from './reducers';
const store = createStore(appReducer);

class App extends React.Component {
  render () {
    return (
      <div>
        <h2>React Tests</h2>
        <p><a href="http://campus.codeschool.com/courses/powering-up-with-react/level/2/section/1/building-an-app">course</a></p>
        <ReduxTest />
      </div>
    );
  }
}


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
