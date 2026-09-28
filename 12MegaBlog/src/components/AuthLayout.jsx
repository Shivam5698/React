import {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Skeleton from './ui/Skeleton'

export default function Protected({children,authentication=true}){

    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)

    useEffect(()=>{
    if(authentication && authStatus!==authentication){
        navigate("/login")
    }
    else if(!authentication && authStatus!==authentication){
        navigate('/')
    }
    else{
      // eslint-disable-next-line
      setLoader(false)
    }
    },[authStatus,navigate,authentication])

  return loader ? (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col justify-center gap-5 px-4 sm:px-6" aria-busy="true" aria-label="Loading page">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-48 w-full rounded-3xl" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ) : <>{children}</>
}
