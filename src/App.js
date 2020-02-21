import React, { useEffect, useState } from 'react';
import Sitebar from './home/Navbar';
import Auth from './components/Auth'
import Home from './components/Home'

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [category, setCategory] = useState('Beef')


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <Home token={sessionToken} category={category} setCategory={setCategory} /> :
      <Auth updateToken={updateToken} />)
  }

  return (
    <div >
      <Sitebar clickLogout={clearToken} token={sessionToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
