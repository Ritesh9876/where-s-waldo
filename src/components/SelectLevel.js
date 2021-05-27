import React from 'react'
import {Link} from 'react-router-dom'
import waldo1 from '../images/waldo-1.jfif'
import waldo2 from '../images/waldo-2.jpg'
import waldo3 from '../images/waldo-3.jpg'
import waldlogo from '../images/small-waldo.png'
import wizardlogo from  '../images/wizardLogo.jpg'
import oldawlogo from '../images/oldaw.jpg'

function SelectLevel(){
    let id=[1,2,3];
return(
    <div className="Alllevels">
<Link to={`/level1/${id[0]}`} >
        <div className="level-1 level" image={waldo1}>
            <div className="level-image"><img src={waldo1} alt="" /></div>
            <div className="level-des">
            <p>Level 1</p>
            <div className="characters">
                <div className="character">
                    <img src={waldlogo} alt="" />
                </div>
            </div>
            </div>
            
        </div>
        </Link>
        <Link to={`/level1/${id[1]}`} >
        <div className="level-2 level">
            <div className="level-image"><img src={waldo2} alt="" /></div>
            <div className="level-des">
            <p>level 2</p>
            <div className="characters">
                <div className="character">
                <img src={waldlogo} alt="" />
                </div>
                <div className="character character-oldaw ">
                <img src={oldawlogo} alt="" />
                </div>
            </div>
            </div>
        </div>
        </Link>
        <Link to={`/level1/${id[2]}`} >
        <div className="level-3 level">
            <div className="level-image"><img src={waldo3} alt="" /></div>
            <div className="level-des">
            <p>level 3</p>
            <div className="characters">
            <div className="character">
                <img src={waldlogo} alt="" />
                </div>
                <div className="character character-oldaw ">
                <img src={oldawlogo} alt="" />
                </div>
                <div className="character character-wizard">
                    <img src={wizardlogo} alt="" />
                </div>
            </div>
            </div>
        </div>
        </Link>
    </div>
)
}

export default SelectLevel