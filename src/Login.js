import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import {Link, useHistory, Redirect} from 'react-router-dom';
import {db, firebaseApp} from './firebase';


function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(0); // 0 for pending 1 for true 2 for false
  const [uid, setUid] = useState("");

  const [load, setLoad] = useState(false);


const login = () => {
  if(email.length < 3){
    alert('!!!');
    return
  }
  firebaseApp.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    const uid = (firebaseApp.auth().currentUser || {}).uid
    if(uid){
      setLoginStatus(1);
      setUid(uid);

      setEmail("");
      setPassword("");
    } else{
      alert('error');
    }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

useEffect(() => {
  firebaseApp.auth().onAuthStateChanged((user) => {
    const uid = (firebaseApp.auth().currentUser || {}).uid
    if(uid){
      setLoginStatus(1);
      setUid(uid);
    }else{
      setLoginStatus(2);
    }
  })
}, [])

useEffect(() => {
  if(!loginStatus){
    setLoad(true);
  }
}, [loginStatus])

return (
  <div >
      {
          load && loginStatus==1 && <Redirect to="/" />
      }
{
    load && loginStatus==2 &&
    <div>
    <input onChange={evt => {setEmail(evt.target.value)}}
    className="default_textarea" placeholder="email" value={email}
    />

    <input onChange={evt => {setPassword(evt.target.value)}}
    className="default_textarea" placeholder="password" value={password}
    />
    <div className="btn btn-success" onClick={evt => {login()}}>Login</div>
    </div>
  }
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <hr/>
    <br/>
    <hr/>
    
  </div>
);
}

export default Login;
