import React, { useEffect, useState } from 'react';
import './User.scss';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const User = ({setUser, user}) => {
  const handleSignin = async () => {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(getAuth(), provider);
    setUser(result.user)
  }

  const handleSignout = async () => {
    // Sign out of Firebase.
    await signOut(getAuth());
    setUser(null);
  }

  return (
    <section id='sign-in'>
      <div id='current-user'>{user?.displayName || 'Guest'}</div>
      <button className='userbuttons' id='sign-in-button' onClick={user ? () => handleSignout() : () => handleSignin()}>
        Sign {user ? 'out' : 'in'}
      </button>

    </section>
  );
}

export default User;