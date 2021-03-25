import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import {Link, useHistory} from 'react-router-dom';
import {db, firebaseApp} from './firebase';


function App() {
  const history = useHistory();
  const [chatContent, setChatContent] = useState("");
  const [chats, setChats] = useState([]);

  const [targetDocumentId, setTargetDocumentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  const [loginStatus, setLoginStatus] = useState(0); // 0 for pending 1 for true 2 for false
  const [uid, setUid] = useState("");

  const [load, setLoad] = useState(false);

const onTextareaChange = (evt) => {
  console.log(evt.target.value);
  //currentName = evt.target.value;
  setChatContent(evt.target.value);
}

const logout = () => {
  firebaseApp.auth().signOut();
  setLoginStatus(2);
}

useEffect(() =>{
  const chatRef = db.collection('chat').orderBy("time");

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
      content: chatContent,
      time : Date().toLocaleString(),
      email : (firebaseApp.auth().currentUser || {}).displayName
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

return (
  <div >
    {load && loginStatus==1 &&
    <div className="btn btn-danger" onClick={evt => {logout()}}>Logout</div>
}
{
    load && loginStatus==2 &&
    <>
    <div className="btn btn-danger">
    <Link to="/Login">Please Login!</Link>
    <br/>
    </div>
    <div className="btn btn-success">
    <Link to="/Signup">Or Sign Up!!</Link>
    <br/>
    </div>
    </>
  }
    <br/>
    <br/>
    <br/>
    <br/>
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
          {chat.time} - {chat.content} - {chat.email} ({chat.id})</div>
      })
    }
    
  </div>
);
}

export default App;
