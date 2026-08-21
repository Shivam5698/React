// import { useState } from 'react'
import './App.css'
import Card from './components/card'


function App() {
  let myObj={
    username:"hitesh",
    age:21
  }
  let newArr=[1,2,3]

  return (
    <>
    <h1 className='bg-green-400 text-black p-4 rounded-xl'>Tailwind test</h1>
    <Card username="chai aur code" btnText="clickme" />
    <Card username="shamual" />
    </>
  )
}

export default App
