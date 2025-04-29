import { auth } from "../firebase/index"
import getUserColor from "../utils/getUserColor";

const Message = ({data}) => {


    //eger mesaji gonderen kisi oturumu acik olan kisiyse mesai ekrana bas
    if(data.author.id === auth.currentUser?.uid){
        return <p className="max-w-[90%] p-[2px_8px] bg-black text-white rounded-[7px_7px_0_7px] self-end message">{data.text}</p>
    }
  return (
    <div className="flex items-start gap-1">
        <img src={data.author.photo} alt="" className="size-[40px] rounded-full"/>
        <div className="flex flex-col gap-1 w-full">
            <span className="font-bold whitespace-nowrap text-zinc-700 message" style={{color:getUserColor(data.author)}}>{data.author.name}</span>
            <p className="text-zinc-800 bg-zinc-300">{data.text}</p>
        </div>
    </div>
  )
}

export default Message