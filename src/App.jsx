import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [Todo, setTodo] = useState("");
  const [page, setPage] = useState(1)

const addTodo=()=>{
  fetch("http://localhost:8080/todos",{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body: JSON.stringify({
      "name":Todo
    })
  })
  .then((res)=>res.json()).then((data)=>{
    setTodos([...todos,data]);
    setTodo("")
  });
}

useEffect(()=>{
  fetch(`http://localhost:8080/todos?_page=${page}&_limit=5`)
  .then((res)=>res.json()).then((data)=>
  setTodos(data))
},[page])

  return (
    <div className="App">
      <div>
      <button 
      onClick={()=>setPage(page-1)}
      disabled={page<=1}
      >{`<`}</button>
      <button 
      onClick={()=>setPage(page+1)}
      //disabled={todos.length<page*5}
      >{`>`}</button>
      </div>
     <input type="text" 
     value={Todo}
     onChange={({target})=>setTodo(target.value)}/>
     <button onClick={addTodo}>Add</button>
     <div>{todos.map((todo)=>(
       <div key={todo.id}>{todo.name}</div>
     ))}</div>
    </div>
  )
}

export default App
