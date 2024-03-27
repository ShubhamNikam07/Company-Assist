import { Link, useNavigate } from "react-router-dom";
import eyeImg from "../assets/hide-password.svg";
import { useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { isValidEmail } from "./common/isValidemail";

const Login = () => {
  const navigate = useNavigate();
  const [validCred, setInvalidCred] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const[seePassword,setSeePassword] = useState(false);

  const loginUser = async () => {
    console.log("login info of user ", userInfo);

    try {
      if (userInfo.email === "" || userInfo.password === "") {
        setInvalidCred(true);
        return;
      }

      const isEmail = isValidEmail(userInfo.email);
      if (!isEmail){setInvalidCred(true);
        throw new Error("Email is not valid");}

      const loginResult = await axios.post("http://localhost:4000/api/v1/login", { ...userInfo });
      if(!loginResult.data.success){
        window.alert(loginResult.data.message)
      }
      // console.log("login result we got ", loginResult);

      if (loginResult?.data?.success) {
        localStorage.setItem("token","shubhamnikamroiting");
        navigate("/dashboard")
      } else setInvalidCred(true);
    } catch (err) {
      window.alert("Invalid Credentails")
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    if (validCred) setInvalidCred(false);
    console.log(e.target.value);
    setUserInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className={`loginscreen flex flex-col bg-white w-3/12 self-center p-6 text-slate-500 shadow-xl rounded-lg py-4 gap-6 ${validCred ? "invalid-credentials" : ""}`}>
      <span className="text-black my-4 text-xl opacity-65 login-set-start self-center">Login to get started </span>

      <label className="flex flex-col">
        <p className={`self-start ${validCred && !userInfo.email ? "text-red-500" : ""}`}>
          Email
        </p>
        <input
          id="email"
          className={`border-2 border-slate-300 py-2 rounded-md ${validCred && !userInfo.email ? "border-red-500 text-red-500" : ""}`}
          onChange={handleChange}
        />
        {validCred && !userInfo.email && <span className="text-red-500 self-start text-xs">Email is required</span>}
      </label>

      <label className="flex flex-col relative">
        <p className={`self-start ${validCred && !userInfo.password ? "text-red-500" : ""}`}>
          Password
        </p>
        <input
          id="password"
          type={seePassword?"text":"password"}
          className={`border-2 border-slate-300 opacity-65 py-2 rounded-md ${validCred && !userInfo.password ? "border-red-500 text-red-500" : ""}`}
          onChange={handleChange}
        />
        {validCred && !userInfo.password && <span className="text-red-500 self-start text-xs">Password is required</span>}
        {seePassword  ?<FaEye className="w-6 right-3 text-lg top-1/3 mt-[6px] absolute cursor-pointer" onClick={()=>setSeePassword(!seePassword)}/>:<FaEyeSlash className="w-6 text-lg right-3 top-1/3 mt-1 absolute cursor-pointer" onClick={()=>setSeePassword(!seePassword)}/>}
        <span className="self-end cursor-pointer text-[#035FB2] text-xs mt-2">Forgot password?</span>
      </label>

      <button className="loginbtn bg-[#035FB2] py-2 w-2/4 self-center rounded-3xl text-white my-4" onClick={loginUser}>
        Login
      </button>

      {validCred && userInfo.password && userInfo.email && <span className="text-red-500 slesta mx-auto">invalid credentials</span>}
    </div>
  );
};

export { Login };
