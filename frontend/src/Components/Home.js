import bg from "../assets/login-bg-1.svg";
import logo from "../assets/Logo.svg";
import { Login } from "./Login";

const Home = ()=>{
    return(
       <div className="relative w-full flex flex-col home">
             <img src={bg} className="mx-auto scale-110 loginall-img"/>
             <div className="loginall absolute top-10 flex flex-col self-center gap-6 w-full">
                <div className="flex self-center flex-col gap-6">
                <img src={logo} className="w-20 self-center "/>
                <span className="text-white online-project">Online project management</span>
                </div>
                <Login />                   
             </div>
       </div>
    )
}

export {Home};