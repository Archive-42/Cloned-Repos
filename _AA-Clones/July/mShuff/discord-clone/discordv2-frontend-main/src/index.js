import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppContainer from './App';
import io from 'socket.io-client';
import { baseUrl } from './config';

const socket = io.connect(baseUrl);

socket.on('error', (error) => {
  console.error(error);
})

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <AppContainer socket={socket}/>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
