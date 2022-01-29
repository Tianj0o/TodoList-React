export function Todos(props){
  const handleDoneBtnClick = (index)=>{
    console.log(index)
    props.changeTodos(index,1)
  }
  const handleDelBtnClick = (index)=>{
    props.changeTodos(index,2)
  }
  return (
    <ul>
     {props.todos.map((todo,index)=> (props.currentBox===todo.type||props.currentBox===0||props.currentBox===2&&todo.type!==1)&&<li className={`content ${todo.type===1? 'done':""}`} key={index}>
       <span className="doneBtn" onClick={()=>handleDoneBtnClick(index)} >{"✅"}</span>
       {todo.content}
       <span className="delBtn" onClick={()=>handleDelBtnClick(index)} >{"❌"}</span>
       </li>)}
    </ul>
  )
}