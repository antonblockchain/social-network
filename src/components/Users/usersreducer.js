import getUsers,{getFollow,getUnFollow} from '../api/api'
import {initial} from '../initial'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_SELECTED_PAGE = 'SET-SELECTED-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const SET_FETCHING = 'SET-FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE-FOLLOWING-PROGRESS'


export default function usersreducer (state = initial,action){
    switch(action.type){
        case FOLLOW: 
        return {
            ...state, 
            users: state.users.map(e=>{
            if(e.id === action.userId){
                return{...e, followed:true}
            } 
            
            return e
         } )
        }   
        case UNFOLLOW:
            return {
                ...state, 
                users: state.users.map(e=>{
                if(e.id === action.userId){
                    return{...e, followed:false}
                } 
                
                return e
             } )
        }   
        case SET_USERS:{
            return {...state,users: [...action.users]}
        }
        case SET_SELECTED_PAGE:{
            return {...state, selectedPage: action.selectedPage }
        }
        case SET_TOTAL_COUNT:{
            return { ...state, totalcount: action.county }
        }
        case SET_FETCHING:{
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {...state, followingProgress: 
            action.isFetching ?
            [...state.followingProgress, action.userId]
            : state.followingProgress.filter(id=> id!=action.userId)
            }
        }

        default:
            return state
    }
    
}

export const follow = (userId)=> ({type: FOLLOW, userId})
export const unfollow = (userId)=> ({type: UNFOLLOW,userId})
export const setUsers = (users)=> ({type: SET_USERS,users})
export const setSelectedPage = (selectedPage)=> ({type: SET_SELECTED_PAGE,selectedPage})
export const setTotalCount = (cunt)=> ({type: SET_TOTAL_COUNT,county: cunt})
export const setFetching = (fetchi)=> ({type: SET_FETCHING,isFetching: fetchi})
export const setFollowingProgress = (fetchi,userId)=>({type: TOGGLE_FOLLOWING_PROGRESS, isFetching: fetchi,userId })


export const getUsersThunk = (selectedPage, pageSize) => { 
    return async (dispatch)=>{
    dispatch(setFetching(false))
    let data = await getUsers(selectedPage, pageSize)
         dispatch(setTotalCount(data.totalCount))
         dispatch(setUsers(data.items))
         dispatch(setFetching(true))
     }
    }

export const FollowThunk = (userId)=>{
    return async (dispatch)=>{
        dispatch(setFollowingProgress(true, userId))
        let response = await getFollow(userId)
          if(response.data.resultCode === 0){
         dispatch(follow(userId))
        }
        dispatch(setFollowingProgress(false,userId))
}
}

export const UnFollowThunk = (userId)=>{
    return async (dispatch)=>{
        dispatch(setFollowingProgress(true,userId))
        let response = await getUnFollow(userId)
        
          if(response.data.resultCode === 0){
            dispatch(unfollow(userId))
          }
          dispatch(setFollowingProgress(false,userId))
    
}
}
