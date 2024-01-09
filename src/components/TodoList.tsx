import Button from "./ui/Button";

// import AxiosInstance from "../Axios/Axios.config";
// import { useQuery } from "@tanstack/react-query";
import CustomHookAuth from "../Hooks/CustomHookAuth";

const TodoList = () => {
  const getUserLocalStorage =  window.localStorage.getItem("token");
  const getTokenLocalStorage = getUserLocalStorage ?   JSON.parse(getUserLocalStorage) : null

  
  const { isLoading, error, data }  =CustomHookAuth({
    keys:["todos"],
    url:"/users/me?populate=todos",
    config:{
      headers:{
        Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
      }
    }
  })
    
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // End ReactQuery
  return (
    <div className="space-y-1 ">
    {
      
      data?.data.todos.length > 0 ?
      (
         data?.data.todos.map((todo,index) =>(
           <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
             <p className="w-full font-semibold">{index + 1} - {todo.title}</p>
             <div className="flex items-center justify-end w-full space-x-3">
               <Button size={"sm"}>Edit</Button>
               <Button variant={"danger"} size={"sm"}>
                 Remove
               </Button>
             </div>
           </div>
      ))

      )
      :
      (
        <h1>No Todo Yet!</h1>
      )
    }
    </div>
  )
};

export default TodoList;
