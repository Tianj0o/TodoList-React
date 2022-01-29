import { useEffect, useState } from "react"
import {Checkbox} from './components/checkbox'
import {Todos} from './components/todos'
function App() {
  const [items,setItems] = useState([{count:0,name:'ALL'},{count:0,name:'Done'},{count:0,name:"UNDone"}])
  const [currentBox,setCurrentBox] = useState(0)
  const [todos,setTodos] = useState([])
  const handleInput = (e)=>{
    if(e.code==='Enter'&&e.target.value!==''){
      todos.push({content:e.target.value,type:currentBox})
      setTodos([...todos])
      e.target.value = ''
    }
  }
  function changItems(){
      items[0].count = todos.length
      items[1].count = todos.filter(todo=>todo.type===1).length
      items[2].count = items[0].count - items[1].count 
      setItems([...items])
  }
  function changeTodos(index,type){
    if(type===2){
      todos.splice(index,1)
    }else{
    todos[index].type = todos[index].type=== 0 ? 1 :0
    }
    setTodos([...todos])
  }
  useEffect(()=>{
    changItems()
  },[todos])
  return (
    <div className="todo-list">
      <h1>TODO List</h1>
      <Checkbox currentBox={currentBox} changeCurrentBox={setCurrentBox} items={items} />
      <input type="text" onKeyPress={(e)=>handleInput(e)} placeholder="Enter TODO" />
      <Todos todos={todos} currentBox={currentBox} changeTodos={changeTodos} />
    </div>
  )
}

export default App
