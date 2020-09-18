import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialState = {
  username: '',
  password: '' 
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState(initialState);

  const history = useHistory();

  const handleChange = e => {
    e.preventDefault();
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', creds)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        history.push('/protected');
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <h2>Login to Continue</h2>
      <form onSubmit={login}>
        <input
        type='text'
        name='username'
        placeholder='Username'
        value={creds.username}
        onChange={handleChange}
        />

        <input
        type='password'
        name='password'
        placeholder='Password'
        value={creds.password}
        onChange={handleChange}
        />

        <button>Login</button>

      </form>
    </>
  );
};

export default Login;
