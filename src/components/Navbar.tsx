import { NavLink } from "react-router-dom";

const Navbar = () => {
  // const getUserLocalStorage =  true
  const getUserLocalStorage =  window.localStorage.getItem("token");
  const getTokenLocalStorage = getUserLocalStorage ?   JSON.parse(getUserLocalStorage) : null
  const UserName = getTokenLocalStorage ?  getTokenLocalStorage.user.username : "";
  // console.log(UserName);

  const HandelLogOut = ()=>{
    window.localStorage.removeItem('token');
    location.replace('/login')
  }

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>

        {
          getTokenLocalStorage ? (
            <div className="text-white font-bold ">
            <NavLink to="profile">{UserName}</NavLink>
            <button  onClick={HandelLogOut} className="ml-5 bg-red-500 p-1 rounded-md hover:bg-red-700">LogOut</button>
            </div>
          ) :
          (
            <p className="flex items-center space-x-3">
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/login">Login</NavLink>
          </li>
        </p>
          )
        }
        
      </ul>
    </nav>
  );
};

export default Navbar;
