import {initial} from '../initial'
import {AuthAPI, securityApi} from '../api/api'
import {stopSubmit} from 'redux-form'
const SET_USER_DATA = 'SET-USER-DATA'
const SET_LOGED_USER = 'SET-LOGED-USER'
const GET_CAPTCHA = 'GET_CAPTCHA'

const authReducer = (state = initial, action)=>{
    switch(action.type){
        case SET_USER_DATA:
            return{
                ...state,
                login: action.login,
                isAuth: true
            }
        case SET_LOGED_USER:
            return{
                ...state,
                data: action.data
            }
            case GET_CAPTCHA:
                return {...state, captchaUrl: action.url}
        default:
            return state
    }
}

export const getdata = (userId,email,login, isAuth)=>({type: SET_USER_DATA,userId,email, login, isAuth})
export const getLogedData = (data)=>({type: SET_LOGED_USER, data})
const getCaptcha = (url)=>({type: GET_CAPTCHA, url})
export default authReducer

export const ProfileThunk = ()=>{
    return (dispatch)=>{
        AuthAPI.me().then(data=> {
            if(data.data.resultCode === 0){ 
                let {id, login, email} = data.data
                dispatch(getLogedData(data.data))
                dispatch(getdata(id,email,login, true))
            }
        })
    }
}

export const LoginThunk = (email, password, rememberMe, captcha) => async (dispatch)=>{
    
            
    
    const response = await AuthAPI.login(email,password, rememberMe, captcha)
        if(response.data.resultCode === 0){
            dispatch(ProfileThunk())
        }
        else{
        
        if(response.data.resultCode === 10){
            dispatch(GetCaptchaThunk()) 
        }
            dispatch(stopSubmit('loginn', {email: 'Error'}))
        }
        
    
}
export const LogoutThunk = () => (dispatch)=>{
    AuthAPI.logout().then(response=>{
        if(response.data.resultCode === 0){
            dispatch(getdata(null,null,null,false))
        }
    })
}

const GetCaptchaThunk = () =>{
console.log('hey')
return async (dispatch)=>{
    debugger
   const response = await securityApi.getCaptcha()
   console.log(response)
            dispatch(getCaptcha(response.data.url))
}
}