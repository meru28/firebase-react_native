import React, { Component } from 'react';
import firebase from '@firebase/app';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers';
import Main from './src/components/Main';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

  componentDidMount = () => {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAOyrtKYcn2fh_oy8nXWSZBE7NN1KNcyqo",
      authDomain: "haidok-meru.firebaseapp.com",
      databaseURL: "https://haidok-meru.firebaseio.com",
      projectId: "haidok-meru",
      storageBucket: "haidok-meru.appspot.com",
      messagingSenderId: "689532575481"
    };
    firebase.initializeApp(config);
  }
  
  render(){
   
    return(
      <Provider store={store}>
      <Main style={{flex: 1, backgroundColor: '#F5FCFF'}}/>
      </Provider>
    )
  }
}

export default App;