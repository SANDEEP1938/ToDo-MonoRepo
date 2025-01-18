import React, { useContext, useState } from 'react';
import './app.module.css';
import { loginCheck } from '@m-to-do/auth';
import { UserContext } from '../app/app';

const Login = () => {
    const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={()=>login(username, password)}>LOGIN</button>
    </div>
  );
};

export default Login;
