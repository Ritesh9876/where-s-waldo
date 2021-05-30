import React,{useState,useEffect,useRef} from 'react'
import waldo1 from '../images/waldo-1.jfif'
import waldo2 from '../images/waldo-2.jpg'
import waldo3 from '../images/waldo-3.jpg'
import smallWaldo from '../images/small-waldo.png'
import wizardlogo from  '../images/wizardLogo.jpg'
import oldawlogo from '../images/oldaw.jpg'
import Popup from './Popup'
import { firestore } from '../firebase';
import {Link} from 'react-router-dom'

function Level1({match}){

let timetaken=useRef(null)
const [trigger,settrigger]=useState(false)
let wloc=useRef([])
let oloc=useRef([])
let wizloc=useRef([])
let chararray=[]
let dropdownName=[]
let winncheck=useRef([])
let levimage=""
let t1=null

if(match.params.id==="1"){
levimage=waldo1
}else if(match.params.id==="2"){
  levimage=waldo2
}else{
  levimage=waldo3
}



useEffect(()=>{
  
  async function Caller(id){
    if(id===1){
      let level= await firestore.collection("lev1")
      let levelinfo=await level.get();
      for(const doc of levelinfo.docs){
        wloc.current=[doc.data().xloc,doc.data().yloc]
        console.log(wloc.current)
        t1=performance.now()
      }
    }else if(id===2){
      let level= await firestore.collection("lev2")
      let levelinfo=await level.get();
      for(const doc of levelinfo.docs){
       wloc.current=doc.data().wloc
        oloc.current=doc.data().oloc
      }
      t1=performance.now()
    }else if(id===3){
      console.log("getting locations",id)
      let level= await firestore.collection("lev3")
      let levelinfo=await level.get();
      for(const doc of levelinfo.docs){
        wloc.current=doc.data().wloc
         oloc.current=doc.data().oloc
         wizloc.current=doc.data().wizloc
       }
       t1=performance.now()
    }
    
  }
  Caller(parseInt(match.params.id))
},[])


  function winnalert(e){
    let clickedname=e.target.innerHTML
    let array=winncheck.current
    if(match.params.id==="1"){
      if(array.length===0){
        array.push(clickedname)
        let t2=performance.now()
        settrigger(true)
        timetaken.current=(Math.round(t2-t1))/1000
        alert(array)
        alert(timetaken.current)
      }

    }else if(match.params.id==="2"){
      if(array.length===0){
        array.push(clickedname)
      }else if((array.includes("waldo") && clickedname==="oldaw")  || (array.includes("oldaw") && clickedname==="waldo")){
        array.push(clickedname)
        let t2=performance.now()
        settrigger(true)
        timetaken.current=(Math.round(t2-t1))/1000
        alert(array)
        alert(timetaken)
      }

    }else if(match.params.id==="3"){
      if(winncheck.current.length===0){
        array.push(clickedname)
        
        console.log(array)
      }else if(array.length===1){
        if((array.includes("waldo") && clickedname!=="waldo") ||(array.includes("oldaw") && clickedname!=="oldaw") || (array.includes("wizard") && clickedname!=="wizard")){
          array.push(clickedname)
          console.log(array)
        }
      }else if(array.length===2){
        if(!array.includes(clickedname)){
          array.push(clickedname)
          let t2=performance.now()
          settrigger(true)
          timetaken.current=(Math.round(t2-t1))/1000
          alert(array)
          alert(timetaken)
        }
      }
    }
  }

  function CoordChecker(x,y){
    let allcharcoord=[wloc.current,oloc.current,wizloc.current]
   let finalcoords =allcharcoord.filter(loc=>loc.length!==0)
    finalcoords.forEach((loc,index)=>{
      let Xpresent=[]
      let Ypresent=[]
      if(index===2){
         Xpresent=[loc[0]-1,loc[0],loc[0]+1]
         Ypresent=[loc[1]-4,loc[1]-3,loc[1]-2,loc[1]-1,loc[1],loc[1]+1,loc[1]+2,,loc[1]+3]
      }else{
         Xpresent=[loc[0]-1,loc[0],loc[0]+1]
         Ypresent=[loc[1]-1,loc[1],loc[1]+1]
      }
      
      let alldropdowns=document.querySelectorAll(".dropdown a")
         if(Xpresent.indexOf(x)!==-1 && Ypresent.indexOf(y)!==-1){
           console.log("starting to get inside winnalert")
           alldropdowns[index].addEventListener("click",winnalert,true)
           alldropdowns[index].style.pointerEvents="auto"
         }else{
           alldropdowns[index].style.pointerEvents="none"
           alldropdowns[index].removeEventListener("click",winnalert)
         }
    })
 
  }
    
     function handleClick(e){
let dropdown=document.querySelector(".dropdown")
dropdown.style.display="block"
const xCoord = Math.round(
  (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
);
const yCoord = Math.round(
  (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
);
dropdown.style.top=`${yCoord}%`
dropdown.style.left=`${xCoord}%`
CoordChecker(xCoord,yCoord)
    }

    function characterdisplay(){
     
      let id=parseInt(match.params.id)
     if(id===1){
        chararray.push(<img src={smallWaldo} alt=""  className="char-waldo" key="1"/>)
        dropdownName.push(<a href="#" key="1">waldo</a>)
     }else if (id===2){
       console.log("working")
      chararray.push(<img src={smallWaldo} alt="" className="char-waldo"  key="1"/>)
      chararray.push(<img src={oldawlogo} alt="" className="char-oldaw"  key="2"/>)
      dropdownName.push(<a href="#" key="1">waldo</a>)
      dropdownName.push(<a href="#" key="2">oldaw</a>)

     }else{
      chararray.push(<img src={smallWaldo} alt="" className="char-waldo"  key="1"/>)
      chararray.push(<img src={oldawlogo} alt="" className="char-oldaw"  key="2"/>)
      chararray.push(<img src={wizardlogo} alt="" className="char-wizard"  key="3"/>)
      dropdownName.push(<a href="#" key="1">waldo</a>)
      dropdownName.push(<a href="#" key="2">oldaw</a>)
      dropdownName.push(<a href="#" key="3">wizard</a>)
     }
    }
    characterdisplay()
    return(
      //  <h1>Narayan Narayan</h1>
      <div className="game-container">
        <div className="level-header">
        <div className="game-characters">
          {
            chararray.map((char)=>(
              char
            ))
          }
        </div>
        <div className="return-button">
          <Link to="/">
          <button>Return Home</button>
          </Link>
        </div>
        </div>
       
        <div className="game-grid">
         <div className="game-image" onClick={(e)=>{
           handleClick(e);
         }}>
           <img src={levimage} alt="" />
         </div>
         <div className="dropdown">
           <div className="dropdown-name">
           {
             dropdownName.map(name=>(
               name
             ))
           }
           </div>
         </div>
        </div>
        <Popup trigger={trigger} settrigger={settrigger} time={timetaken.current} level={parseInt(match.params.id)}/>
        </div>
    )
}
export default Level1