import { collection, onSnapshot, orderBy } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { query, where } from "firebase/firestore";
import { db } from "../firebase"
import Message from "./Message";
import Arrow from "./Arrow";
import { auth } from "../firebase";

const Main = ({room}) => {
    const [messages, setMessages]= useState([]);
    const [isAtBottom, setIsAtBottom]= useState(true);
    const lastMsgRef = useRef()
    const containerRef = useRef()

useEffect(()=>{
    // firestore'dan veri almak için bir referans oluştur
    // const collectionRef = collection(db, "messages");
    const collectionRef= collection(db, "messages")

   const q = query(collectionRef, where("room","==",room),orderBy("createdAt","asc"))
   const unsub = onSnapshot(q,(data)=>{
        const temp = []
        data.docs.forEach((doc)=>{
            temp.push(doc.data())
        })
        setMessages(temp)

    })
    return () => unsub();
},[]);


// her yeni mesaj geldiğinde ekranı aşşağıya kaydır
useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];

      if (lastMsg.author.id === auth.currentUser.uid) {
        // eğer son mesajı oturumu açık kullanıcı attıysa attıysa her koşulda en aşşağıya kaydır:
        scrollToBottom();
      } else if (isAtBottom) {
        // eğer son mesajı farklı bir kullanıcı attıysa sadece isAtBottom true ise en aşşağıya kaydır
        scrollToBottom();
      }
    }
  }, [messages]);


 // en aşşağıya kaydır
 const scrollToBottom = () => {
    lastMsgRef.current.scrollIntoView();
  };

  // scroll yukarıda mı aşşağıda mı hesapla
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 200);
  };





  return (
    <main ref={containerRef} onScroll={handleScroll} className="flex-1 p-3 flex flex-col gap-3 w-full overflow-y-auto relative">
    {messages.length < 1 ? (
      <div className="h-full grid place-items-center text-zinc-400">
        <p>Sohbete ilk mesajı gönderin</p>
      </div>
    ) : (
      messages.map((i, key) => <Message key={key} data={i}/>)
    )}

    <div/>



    <div ref={lastMsgRef}/>
    
    <Arrow isAtBottom={isAtBottom} handleScroll={scrollToBottom} />
  </main>
  )
}

export default Main