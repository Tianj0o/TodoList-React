import {useEffect, useRef} from "react"
let startIndex = 0
let isOnly = false
export function Drag({items,setItems,render}){
  const handleDragStart = (index,e)=>{
    startIndex = index
    isOnly = true
  }
  async function exchange(items,startIndex,index){
    const startNode = rootRef.current.children[startIndex];
    const arriveNode = rootRef.current.children[index];
    const l1 = startNode.offsetTop
    const l2 = arriveNode.offsetTop;
    await animate([startNode,arriveNode],[l2-l1,l1-l2],500)
    // debugger
    startNode.style.transform = `translateY(0px)`;
    arriveNode.style.transform = `translateY(0px)`;
    [items[startIndex],items[index]]=[items[index],items[startIndex]]
    setItems([...items])
  }
  function animate(elements,distances,duration){
    const start = performance.now()
    let isOk = [0,0]
    return new Promise((res)=>{
      requestAnimationFrame(function animate(time){
        elements.forEach((element,index)=>{
        
          const distance = distances[index];
          const progress = (time-start)/duration*distance;
          if(Math.abs(progress)<=Math.abs(distance)){
            draw(progress,element)
          }else{
            isOk[index]=1
          }
        })
        if(isOk.includes(0)){
          requestAnimationFrame(animate)
        }else {
     
          res()
        }
      })
    })
  }
  function draw(progress,element){
      element.style.transform = `translateY(${progress}px)`;
  }

  useEffect(()=>{
    isOnly = true
  },[items])
  const handleDragOver = (index,e)=>{
    if(startIndex!=index&&isOnly){
      exchange(items,startIndex,index)
      startIndex = index
      isOnly = false
    }
  }
  
  const rootRef = useRef(null)
  return (
    <div ref={rootRef}>
      {render.map((item,index)=><div style={{width:"100%"}}  draggable  onDragStart={(e)=>handleDragStart(index,e)} onDragOver={(e)=>handleDragOver(index,e)} className="test ani" key={index}>{item}</div>)}
    </div>
  )
}