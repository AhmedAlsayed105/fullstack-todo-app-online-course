import { ChangeEvent, useState } from "react";
import CustomHookAuth from "../Hooks/CustomHookAuth"
import Paginator from "../pages/Paginator";
import Skelton from "./ui/Skelton";


export default function TodosPage() {
  const getUserLocalStorage = window.localStorage.getItem("token");
  const getTokenLocalStorage = getUserLocalStorage
    ? JSON.parse(getUserLocalStorage)
    : null;
  const [Page, setPage] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number>(10)
  const [sortBy,setSortBy] = useState<string>("asc")

  const onClickPrev = ()=>{
    setPage(prev => prev - 1)
  }
  const onClickNext = ()=>{
    setPage(prev => prev + 1)
  }
  const onChangePageSize = (e:ChangeEvent<HTMLSelectElement>)=>{
      setPageSize(+e.target.value)
  }
  const onChangeSortBy = (e:ChangeEvent<HTMLSelectElement>)=>{
    setSortBy(e.target.value)
    console.log(e.target.value);
    
  }
  
  const {data,isLoading,error,isFetching} = CustomHookAuth({
    keys:["TodosPage",`${Page}`,`${pageSize},${sortBy}`],
    url:`/todos?pagination[pageSize]=${pageSize}&pagination[page]=${Page}&sort=createdAt:${sortBy}`,


    config:{
       headers: {
          Authorization: `Bearer ${getTokenLocalStorage.jwt}`,
        },
    }
  })
// console.log(data?.data.meta.pagination.total);
// console.log(isFetching);


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
      <div className="mb-3">

        <select value={sortBy} onChange={onChangeSortBy} className="border-2 border-indigo-600 rounded-md p-1 mr-3">
        <option selected disabled >SortBy </option>
        <option value="asc">SortBy Old</option>
        <option value="desc">SortBy News</option>
        </select>

        <select value={pageSize} onChange={onChangePageSize} className="border-2 border-indigo-600 rounded-md p-1" >
        <option  selected  >Page Size </option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        </select>
      </div>
    {data?.data.data.length > 0 ? (

      data?.data.data.map(({id,attributes}:{id:number,attributes:{title:string}}) => (
        <div
            key={id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              { id} - {attributes.title}
            </p>
          </div>
        ))
        ) : (
        <h1>No Todo Yet!</h1>
        )
    }
    <div className="flex flex-col items-center gap-3">
      
          <p className="text-black">Page {Page} to {data?.data.meta.pagination.pageCount} of {data?.data.meta.pagination.total} Records</p>
          <Paginator page={Page} pageCount={data?.data.meta.pagination.pageCount} onClickPrev={onClickPrev} onClickNext={onClickNext} isLoading={isFetching}  />
        
    </div>
      </div>
  );
}
