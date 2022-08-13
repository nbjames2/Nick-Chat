import React, { useEffect, useRef, useState } from 'react';
import './RoomList.scss';
import { off } from "firebase/database";
import { createData, getRef, getData, removeListener } from '../../util/firebase';

const RoomList = ({ db, setActiveRoom, user, activeRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const roomsRef = getRef('rooms');
  const listenerRef = useRef(null);

  useEffect(() => {
    if (user) {
      getListener();
    }

    return () => {
      if (listenerRef.current) removeListener(setRooms, listenerRef.current);
      if (!user) setActiveRoom(null);
    };
  }, [user]);

  const getListener = async () => {
    listenerRef.current = await getData(setRooms, 'rooms');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData({name: newRoom}, 'rooms');
    setNewRoom('');
  };

  const roomHighlight = (name) => {
    if (activeRoom?.name === name) {
      return '#5C6672';
    }
    return '';
  };

  const handleClick = (room) => {
    setActiveRoom(room);
  };

  return (
    <section className='roomlist'>
      <form className='new-room-form' onSubmit={handleSubmit}>
        <input
          className='input menu-input'
          type="text"
          placeholder='Open new room'
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          disabled={user ? '' : true}
        />
        <button type='submit' disabled={user ? '' : true}>Add room</button>
      </form>
      <section className='db-rooms'>
        {rooms.map((value) =>
          <div
            className='room-number'
            style={{ background: roomHighlight(value.name) }}
            value={value}
            onClick={() => handleClick(value)}
            key={value.key}
          >
            {value.name}
          </div>
        )}
      </section>
    </section>
  );
};

export default RoomList;
