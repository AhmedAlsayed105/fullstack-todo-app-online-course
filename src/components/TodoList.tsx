import Button from "./ui/Button";

import CustomHookAuth from "../Hooks/CustomHookAuth";
import MyModal from "../Model/Model";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { ITodo } from "../Interface";
import AxiosInstance from "../Axios/Axios.config";
import Skelton from "./ui/Skelton";
import { faker } from '@faker-js/faker';


const TodoList = () => {
  // 
  const [queryVersion, setQueryVersion] = useState(1);
  // 
  const [open, setIsOpen] = useState(false);
  const [openConfirm, setIsOpenConfirm] = useState(false);
  const [OpenModelAddTodos, setIsOpenModelAddTodos] = useState(false);
  const [isLoadingButtonAdd, setIsLoadingButtonAdd] = useState(false);
  const [isLoadingButtonEdit, setIsLoadingButtonEdit] = useState(false);
  const [isLoadingButtonRemove, setIsLoadingButtonRemove] = useState(false);
  const [todoEdit,setTodoEdit] =  useState<ITodo>(
  {
    id:0,
    title: "",
    description: "",
  })
  const [addTodo,setAddTodo] =  useState<ITodo>(
  {
    title: "",
    description: "",
  })

  const OpenModelAddTodo = () => {
    setIsOpenModelAddTodos(true);
  };
  
  const CloseModelAddTodo = () => {
    setAddTodo(
      {
        title: "",
        description: "",
      })
      setIsOpenModelAddTodos(false);
    };
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
  const OpenModelRemove = (todo:ITodo) => {
    setIsOpenConfirm(true)
    setTodoEdit(todo);
    
  };

  const CloseModelRemove = () => {
    setTodoEdit(
      {
        id:0,
        title: "",
        description: "",
      })

    setIsOpenConfirm(false)
  
  };

  const getUserLocalStorage = window.localStorage.getItem("token");
  const getTokenLocalStorage = getUserLocalStorage
    ? JSON.parse(getUserLocalStorage)
    : null;

    const { isLoading, error, data } = CustomHookAuth({
      keys: ["TodoList",`${queryVersion}` ],
      
      
      url: "/users/me?populate=todos",
      config: {
        headers: {
          Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
        },
      },
    });

  if (isLoading) return (
      <>
      {
        Array.from({length:3},(_,idx)=>(
          <Skelton key={idx}/>
          ))
        }
      </>
    )
  if (error) return "An error has occurred: " + error.message;
  // End ReactQuery

// handelEdit
const handelEdit =(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value} = e.target   
      
    setTodoEdit( prev =>({
      ...prev,[name] : value
    }))
    // console.log(todoEdit);
    
  }
// GenerateTodos Fake
const GenerateTodos = async()=>{
  for (let i = 0; i < 100; i++) {
    try {
      const {data}  = await AxiosInstance.post(`/todos`, {
       data: {
         title:faker.random.words(5),
         description:faker.lorem.paragraph(2),
         user: [getTokenLocalStorage.user.id]
       }
     },{
         headers:{
           Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
         }
         
       })
     } catch (error) {
       console.log(error);
     }
    }
    console.log(data);
}
const handelAddTodo =(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value} = e.target   
      setAddTodo(prev => (
        {...prev,[name] : value}
      ))
    
    
}

// handelSubmitAdd 
const handelSubmitAdd = async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      setIsLoadingButtonAdd(true)
      const {title,description} = addTodo
      
      // console.log(title,description);
      
      try {
       const {status}  = await AxiosInstance.post(`/todos`, {
        data: {
          title,
          description,
          user: [getTokenLocalStorage.user.id]
        }
      },{
          headers:{
            Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
          }
          
        })
        if(status === 200){
          CloseModelAddTodo()
          setQueryVersion(prev => prev + 1)

        }
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoadingButtonAdd(false)
      }
}
// handelSubmite Edit
const handelSubmitEdit = async ()=>{
      setIsLoadingButtonEdit(true)
      const {title,description} = todoEdit
      // console.log(title,description);
      
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
          setQueryVersion(prev => prev + 1)

        }
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoadingButtonEdit(false)

      }
}
// handelSubmitRemove
const handelSubmitRemove = async ()=>{
      // e.preventDefault()
      setIsLoadingButtonRemove(true)
      try {
       const {status}  = await AxiosInstance.delete(`/todos/${todoEdit.id}`, {
          headers:{
            Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
          }
          
        })
        if(status === 200){
          setIsLoadingButtonRemove(false)
          CloseModelRemove()
          setQueryVersion(prev => prev + 1)

        }
      } catch (error) {
        console.log(error);
      }
}


  return (
    <div className="space-y-1 ">
      
      <div className="w-fit mx-auto my-10">
      {
        isLoading  ? 
        (
          <div className="flex items-center justify-center gap-2">
            <div className="h-9 bg-gray-200 rounded-md dark:bg-gray-500 w-28 mb-4"></div>
            <div className="h-9 bg-gray-200 rounded-md dark:bg-gray-500 w-28 mb-4"></div>
          </div>
        ) : 
        (
          <div className="flex justify-center my-5 gap-2">
        <Button size={"sm"} variant={"default"} onClick={OpenModelAddTodo} > Post new todo</Button>
        <Button size={"sm"} variant={"outline"}  onClick={GenerateTodos} >  Generate todos</Button>
      </div>
        )
      }
      </div>
      {data?.data.todos.length > 0 ? (
        data?.data.todos.map((todo:ITodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {todo.id} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button
                onClick={()=> OpenModel(todo)}
                size={"sm"}
              >
                Edit
              </Button>
              <Button onClick={()=> OpenModelRemove(todo)} variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h1>No Todo Yet!</h1>
      )}

      {/* Add todo Model */}
      <MyModal isOpen={OpenModelAddTodos} closeModal={CloseModelAddTodo} title="Add Todo">
          <form  onSubmit={handelSubmitAdd}>
          <div className="my-2 flex flex-col gap-2 ">
            <Input name="title" value={addTodo.title} onChange={handelAddTodo} />
            
            <Textarea name="description"  value={addTodo.description} onChange={handelAddTodo} />
          </div>
          <div className=" flex mt-3 gap-3">
            <Button isLoading={isLoadingButtonAdd}  variant="default">Add</Button>
            <Button variant="cancel" onClick={CloseModelAddTodo}>
              close
            </Button>
          </div>
        </form>
      </MyModal>
      {/* Add todo Model */}


      {/* Edit Model */}
      <MyModal isOpen={open} closeModal={CloseModel} title="Edit Todo">
          <div  >
          <div className="my-2 flex flex-col gap-2 ">
            <Input name="title" value={todoEdit.title} onChange={handelEdit} />
            <Textarea name="description"  value={todoEdit.description} onChange={handelEdit} />
          </div>
          <div className=" flex mt-3 gap-3">
            <Button onClick={handelSubmitEdit} isLoading={isLoadingButtonEdit}  variant="default">UpDate</Button>
            <Button variant="cancel" onClick={CloseModel}>
              close
            </Button>
          </div>
        </div>
      </MyModal>
      {/* Edit Model */}


      {/* Remove Model */}
      <MyModal isOpen={openConfirm} closeModal={CloseModelRemove} title="Are you sure to remove this todo ?">
          <div >
          <div className="my-2 flex flex-col gap-2 ">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, voluptate`${todoEdit.id}`.</p>
          </div>
          <div className=" flex mt-3 gap-3">
            <Button onClick={handelSubmitRemove} isLoading={isLoadingButtonRemove}  variant="danger">yes, remove</Button>
            <Button variant="cancel" onClick={CloseModelRemove} >
              cancel
            </Button>
          </div>
        </div>
      </MyModal>
      {/* Remove Model */}





    </div>
  );
};

export default TodoList;
