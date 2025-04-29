import Form from "../components/Form";
import Header from "../components/Header";
import Main from "../components/Main";


const ChatPage = ({room, setRoom}) => {
  return (
    <div className="md:grid md:place-items-center h-screen">
      <div className="bg-white text-darkgray md:w-[80vw] md:max-w-[600px] h-screen md:h-[80vh] overflow-hidden flex flex-col">
        <Header room={room} setRoom={setRoom}/>

        <Main room={room}/>

        <Form room={room} setRoom={setRoom}/>
      </div>
    </div>
  )
}

export default ChatPage;