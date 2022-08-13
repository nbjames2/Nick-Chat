import React, { useState } from 'react';
import './App.scss';
import { initializeFirebase } from './util/firebase.js';
import RoomList from 'Components/RoomList/RoomList.jsx';
import MessageList from 'Components/MessageList/MessageList.jsx';
import User from 'Components/User/User.jsx';

initializeFirebase();

const App = () => {
  const [activeRoom, setActiveRoom] = useState('');
  const [user, setUser] = useState('');

  return (
    <section className='body-wrapper'>
      <section className='sidebar-wrapper'>
        <div className='sidebar'>
          <h1 className='title'>Nick Chat</h1>
          <User id='user'
            user={user}
            setUser={(user) => setUser(user)}
          />
          <RoomList id='roomlist'
            activeRoom={activeRoom}
            setActiveRoom={(e) => setActiveRoom(e)}
            user={user}
          />
        </div>
      </section>
      {user &&
        <MessageList id='messagelist'
          activeRoom={activeRoom}
          user={user}
        />}
    </section>
  );
}

export default App;
