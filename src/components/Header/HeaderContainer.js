import React, { useEffect } from 'react'
import Header from './Header'
import { getdata, getLogedData, LogoutThunk, ProfileThunk } from '../Login/auth-reducer'
import { connect } from 'react-redux'


function HeaderContainer(props) {
    useEffect(()=>{
       props.ProfileThunk()

    },[])
    return (<Header {...props}/>
    )
}

let MapStatetoProps = (state)=>({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    data: state.auth.data

})

export default connect(MapStatetoProps,{ProfileThunk,getdata, getLogedData,LogoutThunk })(HeaderContainer)
