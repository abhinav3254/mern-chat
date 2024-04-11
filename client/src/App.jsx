import axios from 'axios';
import Auth from './components/Auth';
import Home from './components/Home';
import { useEffect, useState } from 'react';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // setting up base url in axios
  axios.defaults.baseURL = 'http://localhost:4000/api/v1/';

  const childCallBack = (data) => {
    console.log(data);
    setIsLoggedIn(data);
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <div>
      {!isLoggedIn && (
        <Auth logInStatus={childCallBack} />
      )}
      {isLoggedIn && (
        <Home />
      )}
    </div>
  );
}

export default App;