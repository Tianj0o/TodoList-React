export function Checkbox(props){
  return (
    <div className="check-box">
      {props.items.map((item,index)=><Box changeCurrentBox ={props.changeCurrentBox} active={props.currentBox===index ? 'active':''} key={item.name} index={index} name={item.name} count={item.count} />)}
    </div>
  )
}
export function Box(props){
  const handleChangCurrentBox = ()=>{
    props.changeCurrentBox(props.index)
  }
  return (
    <span onClick={handleChangCurrentBox} className={`${props.active} box`}>{props.name}:{props.count}</span>
  )
}