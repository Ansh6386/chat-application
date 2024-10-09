import { useEffect, useState } from 'react'

import './App.css'
import List from './components/lists/List'
import Detail from './components/details/Detail'
import Chat from './components/chats/Chat'
import Login from './components/login/Login'
import Notification from './components/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "./lib/firebase"
import { useUserStore } from "./lib/userStore.js"

function App() {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {

    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);

    });



    return () => {

      unSub();
    }

  }, [fetchUserInfo]);


  if (isLoading) {
    return <div className='loading'>Loading....</div>
  }
  return (
    <>

      <div className="container">
        {
          currentUser ? (
            <>
              <List />
              <Chat />
              <Detail />
            </>
          ) : (<Login />)
        }


        <Notification />
      </div>
    </>
  )
}

export default App
