import {useState} from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import {login} from '../store/authSlice'
import {Alert,Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()

    const create=async(data)=>{
        setError("")
        try {
            const userData=await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser()
                if (userData) dispatch(login({userData}));
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
                <h2 className="mt-10 text-3xl font-bold leading-tight text-white">Give your ideas a place to grow.</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">Create an account and join a community built around sharing what you know.</p>
            </div>
            <ul className="relative space-y-4 text-sm text-white/90">
                <li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-white/15 text-xs font-bold">01</span>Write and publish with ease</li>
                <li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-white/15 text-xs font-bold">02</span>Explore ideas from others</li>
                <li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-white/15 text-xs font-bold">03</span>Build your reading library</li>
            </ul>
        </aside>
        <div className="p-6 sm:p-10">
        <div className='mb-6 flex justify-center lg:justify-start'>
            <Logo width='auto'/>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight text-(--text-h) lg:text-left'>Sign up to create an account
        </h2>
        <p className='mt-2 text-center text-sm text-(--text-muted) lg:text-left'>
         Already have an account?
         <Link
         to="/login"
         className='ml-1 font-semibold text-(--primary) hover:underline'
         >
            Sign In
         </Link>
        </p>
        {error && <div className="mt-5"><Alert>{error}</Alert></div>}
        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register ("name",{
                    required:true,
                })}
                />
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
                 type='submit'
                 className='w-full'
                >
                   Create Account 
                </Button>
            </div>
        </form>
        </div>
        </section>
    </div>
  )
}

export default Signup;