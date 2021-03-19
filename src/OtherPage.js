import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
function OtherPage() {
  const [ourState, setOurState] = useState("");
  const [cnt, setCnt] = useState(0);

const onTextareaChange = (evt) => {
  console.log(evt.target.value);
  //currentName = evt.target.value;
  setOurState(evt.target.value);
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

return (
    <div >
        <Link to="/">go back!</Link>

    </div>
  );
}

export default OtherPage;
