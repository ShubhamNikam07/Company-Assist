const IsloggedIn = ()=>{
    if(localStorage.getItem("token"))
    return true;
    return false;
}
export {IsloggedIn};