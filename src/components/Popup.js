import React,{useState} from 'react'
import { firestore } from '../firebase';
import {Link} from 'react-router-dom'
function Popup({trigger,settrigger,time,level}) {
const [username,setusername]=useState("anonymous")

  async  function getplayers(){
      let change=false
      let changetimeat=null
      let levplayers=null
      if(level===1){
        levplayers= await firestore.collection("lev1players").doc("Sc75IP60ZqUNrXknkUcl")
      }else if(level===2){
          levplayers=await firestore.collection("lev2players").doc("nqNCJ3ANZumcdrsujm4l")
      }else{
          levplayers=await firestore.collection("lev3players").doc("7aiRpb2hM62ILxGcNG6c")
      }
let info=await levplayers.get()
let data=info.data()
for(let id in data){
    console.log(`${id} : ${data[id].name}  ${data[id].time}`)
    if(data[id].time > time){
        change=true
        changetimeat=id
    }
    if(change){break}
}
if(change){
    let j=9
  for( j=9;j>changetimeat;j--){
      let k=data[j-1]
      data[j].name=data[j-1].name
      data[j].time=data[j-1].time  
  }
   if(j===parseInt(changetimeat)){
   data[changetimeat].name=username
   data[changetimeat].time=time
   }
}
levplayers.set(data)
  } 

function handleChange(e){
setusername(e.target.value);
}

    return ( trigger?(
        <div className="popup">
            <div className="popup-inner">
                <div className="time-display">
                    <h1>You finished in {time} sec<span>...</span></h1>
                </div>
                <form>
                    <h1>Name:</h1>
                    <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange}/>
                    <div className="popup-buttons">
                        <Link to="/">
                    <input type="submit" value="Submit Score" onClick={(e)=>{
                        e.preventDefault()
                        getplayers()
                    }}/>
                    </Link>
                    <Link to="/">
                    <button onClick={(e)=>{
                        e.preventDefault()
                        settrigger(false)
                    }
                        
                        } className="cancel">CANCEL</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div> ):""
    )
}


export default Popup
