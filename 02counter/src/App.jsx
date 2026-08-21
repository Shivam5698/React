import { useState } from "react"
function App() {

  const [counter,setCounter]=useState(5)
  // let counter=5;
 const addValue=()=>{
  console.log("clicked",counter)
  //  counter=counter+1
  if(counter<20){
  // setCounter(counter+1)
  setCounter(prevCounter=>prevCounter+1)
  setCounter(prevCounter=>prevCounter+1)
  setCounter(prevCounter=>prevCounter+1)
  }
 }
  const decrease=()=>{
    console.log("decrese",counter);
    if(counter>0){
    setCounter(counter-1)
    }
  }
  return (
    <>
     <h1>chai aur react</h1>
     <h2>Counter value:{counter}</h2>
     <button onClick={addValue}>Add value{counter}</button>
     <br />
     <button onClick={decrease}>Decrease value{counter}</button>
     <p>footer:{counter}</p>
    </>
  )
}

export default App
