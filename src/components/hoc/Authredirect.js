import { Redirect } from "react-router-dom";
import React from 'react'
import {connect} from 'react-redux'

let MapPropsToStateForRedirect = (state)=>({
    isAuth: state.auth.isAuth
})

export let WithAuthRedirect = (Component)=>{ 
    const RedirectedComponent = (props)=>{

    if(!props.isAuth){
        return <Redirect to='/login' />
    } 
    return <Component {...props} />
}
let AuthRedirected = connect(MapPropsToStateForRedirect)(RedirectedComponent)
    
return AuthRedirected
}
