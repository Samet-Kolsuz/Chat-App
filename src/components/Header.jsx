import { auth } from "../firebase"

const Header = ({room, setRoom}) => {
  return (
    <header className="flex justify-between p-5 border border-gray-400 shadow-lg items-center ">
    <p> {auth.currentUser.displayName} </p> 
    <p className="font-semibold">{room}</p>
    <button
    onClick={()=> setRoom(null)}
     className="btn">Farkli Oda</button>
  </header>
  )
}

export default Header