import React from 'react'
import {NavLink} from 'react-router-dom'
import Preloader from '../common/Preloader'

function Header(props) {
    
    if(!props.login){
        <Preloader />
    }
    return (
        <header className='header'>
            <NavLink to='/login' className='headerlink'>
            {props.isAuth ? 
            <div>
                <h4 className='textdata'>Your login <span className='logeddata'>{props.data.data.login}</span></h4>
                <h4 className='textdata'>Your email <span className='logeddatamail'>{props.data.data.email}</span></h4>
                <button onClick={props.LogoutThunk}>Log out</button>
            </div> 
                : 'LOGIN'}
            </NavLink>
        </header>
            
        
    )
}
export default Header
