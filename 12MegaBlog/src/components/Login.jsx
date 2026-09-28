import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Alert,Button,Input,Logo} from "./index";
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'

function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("")
     const login=async(data)=>{
      setError("")
      try {
       const session=await authService.login(data)
       if(session){
        const userData=await authService.getCurrentUser()
      if(userData) dispatch(authLogin({userData}))
          navigate("/")
       }
      } catch (error) {
        setError(error.message)
      }
     }
  return (
    <div className="page-enter w-full py-10 sm:py-14">
    <section className="card-modern mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden p-0 hover:translate-y-0 lg:grid-cols-2">
    <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-10 text-white lg:flex">
      <div className="absolute -right-24 -top-24 size-72 rounded-full border border-white/10" aria-hidden="true" />
      <div className="relative">
        <p className="text-sm font-semibold uppercase text-white/70">MegaBlog</p>
        <h2 className="mt-10 text-3xl font-bold leading-tight text-white">Make room for ideas that matter.</h2>
        <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">Your next read, fresh perspective, or thoughtful story starts here.</p>
      </div>
      <ul className="relative space-y-4 text-sm text-white/90">
        <li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-white/15 text-xs font-bold">01</span>Discover community stories</li>
        <li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-white/15 text-xs font-bold">02</span>Publish your own perspective</li>
        <li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-white/15 text-xs font-bold">03</span>Keep your ideas in one place</li>
      </ul>
    </aside>
    <div className="p-6 sm:p-10">
    <div className="mb-6 flex justify-center lg:justify-start">
      <Logo width='auto'/>
    </div>
    <h2 className='text-center text-2xl font-bold leading-tight text-(--text-h) lg:text-left'>Sign in to your account</h2>
    <p className='mt-2 text-center text-sm text-(--text-muted) lg:text-left'>
          Don't have an account?
          <Link
          to='/signup'
          className='ml-1 font-semibold text-(--primary) hover:underline'>
            Sign Up
          </Link>
    </p>
    {error && <div className="mt-5"><Alert>{error}</Alert></div>}
    <form onSubmit={handleSubmit(login)} className='mt-8'>
       <div className='space-y-5'>
        <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email",{
          required:true,
          validate:{
            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
          }
        })}
        />
        <Input 
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password",{
          required:true,
        })}
        />
        <Button
        type="submit"
        className="w-full"
        >Sign in</Button>
       </div>
    </form>
    </div>
    </section>
    </div>
  )
}

export default Login