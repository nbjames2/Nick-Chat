import React, { useEffect, useRef, useState } from 'react';
import { getRef, getData, createData, removeListener } from '../../util/firebase';
import './MessageList.scss';

const MessageList = ({ user, activeRoom, }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesRef = getRef('messages');
  const listenerRef = useRef(null);

  useEffect(() => {
    if (activeRoom) {
      getListener();
    }

    return () => {
      if (listenerRef.current) removeListener(setMessages, listenerRef.current)
    }
  }, [activeRoom])

  const getListener = async () => {
    listenerRef.current = await getData(setMessages, `messages/` + activeRoom.key)
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const timeConverter = (e) => {
    const today = e % 86400000;
    const hours = Math.floor(today / 3600000);
    let minutes = Math.floor(((today / 1000) - (hours * 3600)) / 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage && activeRoom) {
      const postData = {
        content: newMessage,
        sentAt: Date.now(),
        username: user.displayName
      };
      createData(postData, 'messages/' + activeRoom.key);
      setNewMessage('')
    }
  };

  const renderMessages = () => {
    return messages.map((value, index) => {
      const yourMessage = user?.displayName === value.username;
      return (
        <div className={yourMessage ? 'message yours' : 'message theirs'} key={index}>
          <div className='name-time-container'>
            <div className='message-user'>{yourMessage ? 'You' : value.username}</div>
            <div className='message-sentAt'>{timeConverter(value.sentAt)}</div>
          </div>
          <div className='message-content'>{value.content}</div>
        </div>
      );
  })
  };

  return (
    <section id='messages-wrapper'>
      <h1 className='room-title'>Room: {activeRoom.name}</h1>
      <section id='message-list'>
        {renderMessages()}
        <form id='send-message'>
          <input id='new-message-field' type='text' value={newMessage} placeholder='Send new message' onChange={handleInputChange} />
          <button id='new-message-send' onClick={handleSendMessage}><i className='material-icons'>send</i></button>
        </form>
      </section>
    </section>
  );
}

export default MessageList;