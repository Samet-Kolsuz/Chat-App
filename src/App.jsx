import LoginPage from './pages/LoginPage'
import RoomPage from './pages/RoomPage'
import {auth} from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import ChatPage from './pages/ChatPage';
import Loader from './components/Loader';



const App = () => {
const [user, setUser] = useState(undefined);
const [room, setRoom]= useState(null);

useEffect(()=>{
 const unsub = onAuthStateChanged(auth, (user)=>{ setUser(user)});


 //sayfadan kullanici ayrilinca durdur
 return ()=> unsub();

},[])
if (undefined === user) return <Loader/>;

//oturum acmadiysa login sayfasina git
if (user === null) return <LoginPage/>;

if (room) return <ChatPage room={room} setRoom={setRoom}/>;


//oturum acmissa room sayfasina git
  return <RoomPage  setRoom={setRoom}/> ;

};

export default App;