import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = () => {
  // google ile giris yap
  const HandleLogin = () => {
    signInWithPopup(auth, provider)
    .then((res)=>console.log("giris yapildi",res.user))
    .catch((err)=> console.log("hata giris",err));
  };
  return (
    <div className="wrapper">
    <div className="box h-[450px] flex flex-col justify-center items-center gap-[50px]">
        <h1 className="text-4xl">Chat Odasi</h1>
        <p className="text-gray-400">Devam etmek icin giris yapin</p>

        <button className="flex gap-8 items-center  p-2 px4 rounded-md  shadow-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"onClick={HandleLogin}>
            <img src="/google.png" alt="google" className="w-[30px]" />
            <span>Google ile Gir</span>
        </button>
    </div>
    </div>
  )
}

export default LoginPage;