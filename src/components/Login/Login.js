import { useContext, useState } from 'react';
import React, { Component }  from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { initializeLoginFramework, handleGoogleSignIn, handleSignedOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signedOut = () => {
    handleSignedOut()
    .then(res => {
      handleResponse(res, false);
    })
  }
  
  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
  }

  
  const handleBlur = (e) => {
    let isFieldValid = true;
    // console.log(e.target.name, e.target.value);
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);

      })
    }
     
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }
 
  
  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signedOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in with Google</button>
      }
      <br />
      <button onClick={fbSignIn}>SignIn with Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img style={{ width: "40%" }} src={user.photo} alt=""></img>
        </div>
      }
      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your name" />}
        <br />
        <input type="email" onBlur={handleBlur} name="email" placeholder="Your email address" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required />
        <br />
        <input type="submit" value={newUser ? 'Signup' : 'SignIn'} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>}
    </div>

  );
}

export default Login;
