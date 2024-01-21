import { NavLink } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  // const getUserLocalStorage =  true
  const getUserLocalStorage =  window.localStorage.getItem("token");
  const getTokenLocalStorage = getUserLocalStorage ?   JSON.parse(getUserLocalStorage) : null

  const HandelLogOut = ()=>{
    window.localStorage.removeItem('token');
    location.replace('/login')
  }

  return (
    <nav className="max-w-2xl mx-auto mt-7 mb-20 px-3 py-5">
<ul className="flex items-center justify-between">
  <li className="duration-200 font-semibold text-md text-gray-700">
    <NavLink to="/">Home</NavLink>
  </li>

    {
          getTokenLocalStorage ? (
  <div className="flex items-center space-x-6">
  <li className="duration-200 text-md text-gray-700 font-semibold">
    <NavLink to="todos">Todos</NavLink>
  </li>
  <li className="duration-200 text-md text-gray-700 font-semibold">
    <NavLink to="Profile">Profile</NavLink>
  </li>
  <Button className="cursor-pointer" size={"sm"} onClick={HandelLogOut}>LogOut</Button>
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
  )
};
export default Navbar
