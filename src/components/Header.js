import React from 'react'
import logo from '../images/logo.png'
function Header (){
     
    return(
        <header>
            <div className="logo"><img src={logo} alt="logo" /></div>
            <div className="logo-name"><span>Where's</span> Waldo?</div>
        </header>
    )
} 

export default Header