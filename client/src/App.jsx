import axios from 'axios';
import Auth from './components/Auth';

const App = () => {

  // setting up base url in axios
  axios.defaults.baseURL = 'http://localhost:4000/api/v1/';


  return (
    <div>
      <Auth />
    </div>
  );
}

export default App;