import Button from "./ui/Button";

import CustomHookAuth from "../Hooks/CustomHookAuth";
import MyModal from "../Model/Model";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { ITodo } from "../Interface";
import AxiosInstance from "../Axios/Axios.config";



const TodoList = () => {
  const [open, setIsOpen] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [todoEdit,setTodoEdit] =  useState<ITodo>(
  {
    id:0,
    title: "",
    description: "",
  })

  const OpenModel = (todo:ITodo) => {
    setIsOpen(true);
    setTodoEdit(todo)
  };

  const CloseModel = () => {
    setTodoEdit(
      {
        id:0,
        title: "",
        description: "",
      })
      setIsOpen(false)
    };

  const getUserLocalStorage = window.localStorage.getItem("token");
  const getTokenLocalStorage = getUserLocalStorage
    ? JSON.parse(getUserLocalStorage)
    : null;

  const { isLoading, error, data } = CustomHookAuth({
    keys: ["TodoList",`${todoEdit.id}` ],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
      },
    },
  });
  
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  // End ReactQuery

// handelEdit
const handelEdit =(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value} = e.target   
      
    setTodoEdit( prev =>({
      ...prev,[name] : value
    }))
    console.log(todoEdit);
    
}

// handelSubmite
const handelSubmit = async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      setIsLoadingButton(true)
      const {title,description} = todoEdit
      console.log(title,description);
      
      try {
       const {status}  = await AxiosInstance.put(`/todos/${todoEdit.id}`, {
        data: {
          title,
          description,
        }
      },{
          headers:{
            Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
          }
          
        })
        if(status === 200){
          CloseModel()
        }
      } catch (error) {
        console.log(error);
      }finally{
      setIsLoadingButton(false)

      }
}


  return (
    <div className="space-y-1 ">
      {data?.data.todos.length > 0 ? (
        data?.data.todos.map((todo:ITodo,index:number) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              { index + 1} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button
                onClick={()=> OpenModel(todo)}
                size={"sm"}
              >
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h1>No Todo Yet!</h1>
      )}
      {/* Edit Model */}
      <MyModal isOpen={open} closeModal={CloseModel} title="Edit Todo">
          <form  onSubmit={handelSubmit}>
          <div className="my-2 flex flex-col gap-2 ">
            <Input name="title" value={todoEdit.title} onChange={handelEdit} />
            <Textarea name="description"  value={todoEdit.description} onChange={handelEdit} />
          </div>
          <div className=" flex mt-3 gap-3">
            <Button isLoading={isLoadingButton}  variant="default">UpDate</Button>
            <Button variant="cancel" onClick={CloseModel}>
              close
            </Button>
          </div>
        </form>
      </MyModal>
      {/* Edit Model */}
    </div>
  );
};

export default TodoList;
