import React from 'react'
import 
 {BsPerson, BsJustify}
 from 'react-icons/bs'

function TopSection({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
            <p>Welcome Back, JJ!</p>
        </div>
        <div className='header-right'>
        <span className='username'>Jai Joshi</span>
            <BsPerson className='icon'/>
        </div>
    </header>
  )
}

export default TopSection