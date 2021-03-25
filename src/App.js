import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import {Link, useHistory} from 'react-router-dom';
import {db, firebaseApp} from './firebase';


function App() {
  const history = useHistory();
  const [chatContent, setChatContent] = useState("");
  const [cnt, setCnt] = useState(0);
  const [chats, setChats] = useState([]);

  const [targetDocumentId, setTargetDocumentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(0); // 0 for pending 1 for true 2 for false
  const [uid, setUid] = useState("");

  const [load, setLoad] = useState(false);

const onTextareaChange = (evt) => {
  console.log(evt.target.value);
  //currentName = evt.target.value;
  setChatContent(evt.target.value);
}

const onButtonClick = () => {
  setCnt(cnt + 1);
}

const reset = () => {
  setCnt(0);
}

//useEffect(() => {
//  if(cnt == 10){
//    alert("it;s already 10!")
//  }
//}, [cnt])

const signUp = () => {
  if(email.length < 3){
    alert('!!!');
    return
  }
  firebaseApp.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    const uid = (firebaseApp.auth().currentUser || {}).uid
    if(uid){
      setLoginStatus(1);
      setUid(uid);
    } else{
      alert('error');
    }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

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

const logout = () => {
  firebaseApp.auth().signOut();
  setLoginStatus(2);
}

// useEffect(() =>{
//   setInterval(() => {
//     setCnt(cnt => cnt + 1);
//   }, 1000)
// }, [])

useEffect(() =>{
  const chatRef = db.collection('chat');

  console.log(chatRef);
  chatRef.onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChats(data);
  })

}, [])

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

const addDocument = () => {
  db
    .collection('chat')
    .add({
      uid: uid,
      content: chatContent
    })
    .then((ref) => {
      setChatContent('');
      console.log(ref);
    })
}

const updateDocument = () => {
  const chatRef = db.collection('chat').doc(targetDocumentId)

  chatRef
    .update({
      content: updatedContent
    })
    .then(() => {
      setTargetDocumentId("");
      setUpdatedContent("");
    })
}

const deleteDocument = (documentId) => {
  
  var r = window.confirm("Press a button!");
  if (r == true) {
    db.collection('chat').doc(documentId).delete().then(() => {
      alert('deleted');
    })
  }
  else {
    alert('you chose false!!');
  }

  
}

// const displayLogin = () => {
//   if(loginStatus){
//     return (<div className="btn btn-danger" onClick={evt => {logout()}}>Logout</div>)
//   }
//   else{
//   return (
//     <div>
//     <input onChange={evt => {setEmail(evt.target.value)}}
//       className="default_textarea" placeholder="email" value={email}
//       />

//       <input onChange={evt => {setPassword(evt.target.value)}}
//       className="default_textarea" placeholder="password" value={password}
//       />
//       <div className="btn btn-success" onClick={evt => {login()}}>Login</div>
//       <div className="btn btn-danger" onClick={evt => {signUp()}}>Sign up</div>
//       </div>
//   )
//   }
// }

return (
  <div >
    {load && loginStatus==1 &&
    <div className="btn btn-danger" onClick={evt => {logout()}}>Logout</div>
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
    <div className="btn btn-danger" onClick={evt => {signUp()}}>Sign up</div>
    </div>
  }
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="btn btn-danger">
    <Link to="/other/minseong">go to other page  </Link>  
    <br/>
    </div>
    <div className="btn btn-success" onClick={evt => {onButtonClick()}}>
    button
    </div>
    <div className="btn btn-danger" onClick={evt => {reset()}}>
    reset
    </div>
    <br/>
    <textarea className="default_textarea" value={chatContent} onChange={evt => {onTextareaChange(evt)}}></textarea>
    <div className="btn btn-success" onClick={evt => addDocument()}>Add Document</div>
    <br/>
    <br/>
    <br/>

    <textarea className="default_textarea" value={targetDocumentId} onChange={evt => {
      setTargetDocumentId(evt.target.value);
    }}></textarea>
    <textarea className="default_textarea" value={updatedContent} onChange={evt => {
      setUpdatedContent(evt.target.value);
    }}></textarea>

    <div className="btn btn-success" onClick={evt => updateDocument()}>Update Document</div>

    <br/>
    <hr/>
    <br/>
    <hr/>

    {
      chats.map((chat) => {
        return <div onClick={evt => {deleteDocument(chat.id)}}>
          {chat.id} - {chat.content} - {chat.uid}</div>
      })
    }
    
  </div>
);
}

export default App;
