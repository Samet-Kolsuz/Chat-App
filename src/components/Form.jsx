import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db,auth } from '../firebase';

const Form = ({room}) => {
    const [text, setText]= useState();
    const [isOpen, setIsOpen]= useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // mesaj içerği boşsa iptal et
        if (text.trim() === "") return;
    
        // verinin kaydedileceği kolleksiyonun referansını al
        const collectionRef = collection(db, "messages");
    
        // ilgili kolleksiyonu veriyi ekle
        await addDoc(collectionRef, {
          text,
          room,
          author: {
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            photo: auth.currentUser.photoURL,
          },
          createdAt: serverTimestamp(),
        });
    
        // formu temizle
        setText("");
        setIsOpen(false);
      };
  return (
    <form onSubmit={handleSubmit} className='p-5 border border-gray-400 shadow-lg flex justify-center gap-3 relative'>
        <input value={text} type="text" placeholder='mesajinizi yazin...' onChange={(e)=> setText(e.target.value)} className='border border-gray-400 shadow-sm p-2 px-4 rounded-md w-1/2'/>


        <div className='relative'>
            <div className='absolute top-[-471px] right-[-180px]'>

        <EmojiPicker open={isOpen} onEmojiClick={(e)=>setText(text+e.emoji)}/>
            </div>
        <button onClick={()=>setIsOpen(!isOpen)} className='btn text-base'>😀</button>
        </div>

        <button type='submit' className='btn'>Gonder</button>
    </form>
  )
}

export default Form