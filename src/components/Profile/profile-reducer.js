import { ProfileApi } from '../api/api'
import {initial} from '../initial'

const SET_STATUS = 'SET-STATUS'
const SET_PROFILE = 'SET_PROFILE'
const SET_PHOTO = 'SET_PHOTO'
const SET_INFORMATION = 'SET_INFORMATION'

export const ProfileReducer = (state = initial, action)=>{
    switch(action.type) {
        case SET_PROFILE:{
            return {...state, profile: action.profile}
        }
        case SET_STATUS:{
            return {...state, status: action.status}
        }
        case SET_PHOTO:{
            return {...state, profile: {...state.profile, photos: action.photo.data.photos}}
        }
        case SET_INFORMATION:{
            return {...state, profile:{...state.profile,aboutMe:action.information.aboutMe, lookingForAJob: action.information.lookingForAJob, fullName: action.information.fullName,lookingForAJobDescription: action.information.lookingForAJobDescription}}
        }
        
        default:
            return state
    }
}


export const LoadProfile = (profile)=>({type: SET_PROFILE, profile})
const setStatus = (status)=>({type: SET_STATUS,status})
const setPhoto = (photo)=>({type: SET_PHOTO,photo})
export const setInformation = (information)=>({type: SET_INFORMATION, information})

export const setStatusThunk = (userId)=>{
    return (dispatch)=>{
        ProfileApi.getStatus(userId).then(response=>{
        dispatch(setStatus(response.data))
        })
    }
}

export const updateStatusThunk = (status)=>{
    return (dispatch)=>{
        ProfileApi.updateStatus(status).then(response=>{
            if(response.data.resultCode === 0){
            dispatch(setStatus(status))
            }
        })
    }
}
export const LoadProfileThunk = (userId)=>{
    return (dispatch)=>{
        ProfileApi.getProfile(userId).then(response=>{
            dispatch(LoadProfile(response.data))
        })
    }
}

export const choosePhoto = (photo)=>{
    return (dispatch)=>{
        ProfileApi.loadPhoto(photo).then(response=>{
            dispatch(setPhoto(response.data))
        })
    } 
}

export const LoadInformation = (information)=>{
    return async (dispatch)=>{
        console.log(information)
        let response = await ProfileApi.loadInformation(information)
        debugger
        if(response.data.resultCode === 0)
        dispatch(setInformation(information))
        
    }
}
