import { useState } from "react";
import CustomHookAuth from "../Hooks/CustomHookAuth"
import Paginator from "../pages/Paginator";
import Skelton from "./ui/Skelton";


export default function TodosPage() {
  const getUserLocalStorage = window.localStorage.getItem("token");
  const getTokenLocalStorage = getUserLocalStorage
    ? JSON.parse(getUserLocalStorage)
    : null;
  const [Page, setPage] = useState<number>(1)

  const onClickPrev = ()=>{
    setPage(prev => prev - 1)
  }
  const onClickNext = ()=>{
    setPage(prev => prev + 1)
  }

  const {data,isLoading,error} = CustomHookAuth({
    keys:["TodosPage",`${Page}`],
    url:"/todos",
    config:{
       headers: {
          Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
        },
    }
  })
console.log(data?.data.data);

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

  return (
    <div className="my-5">
    {data?.data.data.length > 0 ? (

      data?.data.data.map(({id,attributes}:{id:number,attributes:{title:string}},index:string) => (
        <div
            key={id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              { index +  1} - {attributes.title}
            </p>
          </div>
        ))
        ) : (
        <h1>No Todo Yet!</h1>
        )
    }
        <Paginator page={Page} pageCount={3} onClickPrev={onClickPrev} onClickNext={onClickNext}   />
      </div>
  );
}
