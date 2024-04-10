import React from 'react'
import 
 {BsPerson, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='sys-header'>
        <div className='sys-menu-icon'>
            <BsJustify className='sys-icon' onClick={OpenSidebar}/>
            <p>Welcome Back Jane!</p>
        </div>
        <div className='sys-header-right'>
        <span className='username'>Jane Elizabeth Doe</span>
            <BsPerson className='sys-icon'/>
        </div>
    </header>
  )
}

export default Header