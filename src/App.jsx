import { useEffect, useState } from "react"

function Checkbox(props){
  return (
    <div className="check-box">
      {props.items.map((item,index)=><Box changeCurrentBox ={props.changeCurrentBox} active={props.currentBox===index ? 'active':''} key={item.name} index={index} name={item.name} count={item.count} />)}
    </div>
  )
}
function Box(props){
  const handleChangCurrentBox = ()=>{
    props.changeCurrentBox(props.index)
  }
  return (
    <span onClick={handleChangCurrentBox} className={`${props.active} box`}>{props.name}:{props.count}</span>
  )
}
function Todos(props){
  const handleDoneBtnClick = (index)=>{
    console.log(index)
    props.changeTodos(index,1)
  }
  const handleDelBtnClick = (index)=>{
    props.changeTodos(index,2)
  }
  return (
    <ul>
     {props.todos.map((todo,index)=> (props.currentBox===todo.type||props.currentBox===0||props.currentBox===2&&todo.type!==1)&&<li className={`${todo.type===1? 'done':" "} content`} key={index}>
       <span className="doneBtn" onClick={()=>handleDoneBtnClick(index)} >{"✅"}</span>
       {todo.content}
       <span className="delBtn" onClick={()=>handleDelBtnClick(index)} >{"❌"}</span>
       </li>)}
    </ul>
  )
}
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
      setItems(items)
  }
  function changeTodos(index,type){
    if(type===2){
      todos.splice(index,1)
    }else{
    todos[index].type = !todos[index].type
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
