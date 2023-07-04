import './App.css';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import axios from 'axios';
import { useStore } from './hooks/useStore';
import Profile from './Profile';

function App() {
  const setAuthData = useStore((state: any) => state.setAuthData);
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="165022993796-1am830nvfdsmob3n8v62thbcf36mqtoe.apps.googleusercontent.com">
        <div>
          Hello
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              const response = await axios.post('http://localhost:3001/login', {
                token: credentialResponse.credential,
              });
              const data = response.data;
              console.log(data);

              localStorage.setItem('authData', JSON.stringify(data));
              setAuthData(data);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <Profile />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
