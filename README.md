------------------------------------------------------------------------------------------------------------------------------
Codux의 React 세미나를 진행한 결과물입니다.
------------------------------------------------------------------------------------------------------------------------------

1번과제 - > 초기 페이지 로딩시에 login옵션이 힐끗 보였다 없어지는 것 제거하기!
  const [load, setLoad] = useState(false); --> load여부를 확인할 수 있는 state를 정의!
  const [loginStatus, setLoginStatus] = useState(0); // 0 for pending 1 for true 2 for false --> login status여부를 3단계로 나누어서 0은 불러오는중, 1은 로그인 완료
  2는 로그인 되지 않음을 나타냄
  
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
페이지 렌더링시에 LoginStatus를 로그인 여부를 확인하고 바꿔준 다음에,
useEffect(() => {
  if(!loginStatus){
    setLoad(true);
  }
}, [loginStatus])
를 통해서 loginStatus가 불러오는중이 아닐 경우에 로드 완료로 상태를 변경해줌.
그 다음, Return 부분에는
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
  아래와 같이 로그인 되어있는 상태라면 로그아웃 버튼을 보여주고, 로그인이 되어있는 상태가 아니라면, 로그인하거나, 회원가입하는 페이지로가는 버튼을 보여줌!
  
  2번과제 - > 데이터베이스에 시간데이터를 추가해서 내림차순으로 정렬해보기!
  const addDocument = () => {
  db
    .collection('chat')
    .add({
      uid: uid,
      content: chatContent,
      time : Date().toLocaleString(),
      email : (firebaseApp.auth().currentUser || {}).displayName
    })
    채팅을 DB에 add해줄때, time 키에 대하여 현재 시간을 저장하도록 설정해주고,
    
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
db를 불러오는 때에, collection.orderBy를 사용하여 time키의 값을 기준으로 정렬해주면 완성!

3번과제 -> 유저의 이름을 보여줄 수 있는 데이터 추가 (displayname)
 const [name, setName] = useState("");
 signup.js에 이름을 위한 state를 추가해주고,
 <input onChange={evt => {setName(evt.target.value)}}
    className="default_textarea" placeholder="name" value={name}
 이름 입력칸을 추가해준 후에,
 firebaseApp.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    const uid = (firebaseApp.auth().currentUser || {}).uid
    if(uid){
      setLoginStatus(1);
      setUid(uid);
      firebaseApp.auth().currentUser.updateProfile({displayName : name})
 signup 함수 안에 firebaseApp.auth().currentUser.updateProfile({displayName : name}) 를 통해서 유저의 displayname을 설정해주었음!
 이후 다시 App.js에서
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
에서 볼 수 있듯, email : (firebaseApp.auth().currentUser || {}).displayName를 통해(email이라고 친것은 오타...ㅜㅜ name으로 쳤어야함) 으로 설정해주면, DB에 입력될때
유저의 이름도 함께 기록이 가능! 그후 
{
      chats.map((chat) => {
        return <div onClick={evt => {deleteDocument(chat.id)}}>
          {chat.time} - {chat.content} - {chat.email} ({chat.id})</div>
      })
    }
와 같은 형식으로 chat.email(email오타.. name으로 통일바람) 을 보여주도록 하면 끝!

4,5번 과제 -> Signup, Login페이지는 각각 만들어주고, 
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
에서처럼 버튼을 통해 로그인과 회원가입페이지로 이동할 수 있게 한다음, 
load && loginStatus==1 && <Redirect to="/" />
로그인페이지나 회원가입 페이지에서 loginStatus가 로그인 된 상태라면 Redirect to를 통해(React-Router-Dom의 함수) 원래 페이지로 리다이렉트 해주면 끝!

수고하셨습니다! 성파님 강의 감사드려요:D
