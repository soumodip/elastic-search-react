import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combineAllReducers from './reducers';

const store = createStore(
    combineAllReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("elastic-search-react-app")
);

registerServiceWorker();
