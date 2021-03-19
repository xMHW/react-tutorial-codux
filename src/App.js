import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {db, firebaseApp} from './firebase';


function App() {
  const [chatContent, setChatContent] = useState("");
  const [cnt, setCnt] = useState(0);
  const [chats, setChats] = useState([]);

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

useEffect(() =>{
  setInterval(() => {
    setCnt(cnt => cnt + 1);
  }, 1000)
}, [])

useEffect(() =>{
  const chatRef = db.collection('chat');

  console.log(chatRef);
  chatRef.onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setChats(data);


    //console.log(snapshot.docs)
  })
}, [])

const addDocumnet = (content) => {
  db
    .collection('chat')
    .add({
      uid: "skdfjwlelldlskdjfjekwl",
      content: chatContent
    })
    .then((ref) => {
      setChatContent('');
      console.log(ref);
    })
}

const updateDocument = (documentId, content) => {
  const chatRef = db.collection('chat').doc(documentID)

  chatRef
    .update()
}

return (
    <div >
      <span className="h3">{cnt}</span>
      <br/>
      <div className="btn btn-danger">
        <Link to="/other/minseong">go to other page!</Link>
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
      <div className="btn btn-success" onClick={evt => {}}>Add Document</div>
      <br/>
      <hr>
      {
        chats.map((chat) => {
          return <div>{chat.id} - {chat.content} - {chat.uid}</div>
        })
      }
      </hr>
    </div>
  );
}

export default App;
