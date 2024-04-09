import axios from 'axios';
import Auth from './components/Auth';
import Home from './components/Home';

const App = () => {

  // setting up base url in axios
  axios.defaults.baseURL = 'http://localhost:4000/api/v1/';


  return (
    <div>
      {/* <Auth /> */}
      <Home />
    </div>
  );
}

export default App;