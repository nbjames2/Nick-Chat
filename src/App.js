import React, { Component } from 'react';
import * as firebase from 'firebase';
import './css/App.scss';
import RoomList from './components/Roomlist';
import MessageList from './components/Messagelist';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCr5SljJUNL1yTx5HSV92r7LvMlgmPS2jA",
  authDomain: "bloc-jams-chat-22790.firebaseapp.com",
  databaseURL: "https://bloc-jams-chat-22790.firebaseio.com",
  projectId: "bloc-jams-chat-22790",
  storageBucket: "bloc-jams-chat-22790.appspot.com",
  messagingSenderId: "970001352980"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeRoom: "",
      userAuth: ""
    }
  }

  handleRoomClick(e) {
    this.setState({ activeRoom: e });
  }

  setUser(user) {
    this.setState({ userAuth: user });
  }

  render() {
    return (
      <section id="fullscreen">
        <section className='sidebar-wrapper'>
          <div className='sidebar'>
            <h1 className='title'>Nick Chat</h1>
            <User id='user'
              firebase={firebase}
              userAuth={this.state.userAuth}
              setUser={(user) => this.setUser(user)}
            />
            <RoomList id='roomlist'
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              handleRoomClick={(e) => this.handleRoomClick(e)}
              user={this.state.userAuth}
            />
          </div>
        </section>
        <section id='messages'>
          {this.state.userAuth
          ? <MessageList id='messagelist'
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            userAuth={this.state.userAuth}
            user={this.state.userAuth}
          />
          : ''}
        </section> 
      </section>
    );
  }
}

export default App;
