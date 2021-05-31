import React,{useRef,useState,useEffect} from 'react'
import { firestore } from '../firebase'

  const LeaderBoard = () => {
      let [render,setrender]=useState(false)
    let Player1=useRef([])
   // const [Player1,setPlayer1]=useState([])
    let Player2=useRef([])
    let Player3=useRef([])
    async function getPlayers(docId,level){
        let lev1players=null
        if(level===1)   lev1players= await firestore.collection("lev1players").doc(docId)
        if(level===2)   lev1players= await firestore.collection("lev2players").doc(docId)
        if(level===3)   lev1players= await firestore.collection("lev3players").doc(docId)
       let info=await lev1players.get()
       let data=info.data()
       for(let id in data){
           if(level===1 && Player1.current.length<10){
           Player1.current.push({name:data[id].name,time:data[id].time,key:id})
           // setPlayer1(players=>(
           //     [...players,{name:data[id].name,time:data[id].time,key:id}]
           // ))
           }else if(level===2 && Player2.current.length<10){
            Player2.current.push({name:data[id].name,time:data[id].time,key:id})

           }else{
               if( Player3.current.length<10){
                Player3.current.push({name:data[id].name,time:data[id].time,key:id})
               }
            if(Player3.current.length===10){setrender(true)}
           }
       }
    }
  getPlayers("Sc75IP60ZqUNrXknkUcl",1)
  getPlayers("nqNCJ3ANZumcdrsujm4l",2)
  getPlayers("7aiRpb2hM62ILxGcNG6c",3)
  console.log(Player3.current.length)
console.log(Player2.current,"player")
    return ( render?(
        <div className="LeaderBoard">
           <div className="LeaderBoard-header">
               <h1>Leader<span>Board</span></h1>
               <div className="level-board">
                   <div className="level1-board">
                       <h1>Level 1</h1>
                       <div className="top-players">
                       {
                           Player1.current.map(player=>(
                               <div className="level1Player player" key={player.key}>
                                   <p className="name">{player.name}</p>
                                   <p className="time">{player.time} sec</p>
                               </div>
                           ))
                       }
                       </div>
                   </div>
                   <div className="level2-board">
                   <h1>Level 2</h1>
                       <div className="top-players">
                       {
                           Player2.current.map(player=>(
                               <div className="level2Player player" key={player.key}>
                                   <p className="name">{player.name}</p>
                                   <p className="time">{player.time} sec</p>
                               </div>
                           ))
                       }
                       </div>
                   </div>
                   <div className="level3-board">
                   <h1>Level 3</h1>
                       <div className="top-players">
                       {
                           Player3.current.map(player=>(
                               <div className="level3Player player" key={player.key}>
                                   <p className="name">{player.name}</p>
                                   <p className="time">{player.time} sec</p>
                               </div>
                           ))
                       }
                       </div>
                   </div>
               </div>
           </div>
        </div>):""
    )
}

export default LeaderBoard
