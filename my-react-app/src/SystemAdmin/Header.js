import React from 'react'
import 
 {BsPerson, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
            <p>Welcome Back Meldy!</p>
        </div>
        <div className='header-right'>
        <span className='username'>Meldy Asili Bile</span>
            <BsPerson className='icon'/>
        </div>
    </header>
  )
}

export default Header