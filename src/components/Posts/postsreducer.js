import {initial} from '../initial'

const SEND_POST = 'SEND-POST'

export const PostReducer = (state = initial, action)=>{
    switch(action.type){
        case SEND_POST:{
            return {...state, posts: [...state.posts, action.posts]}
        }
        default: return state
    }
}

export const sendPost = (posts)=>({type: SEND_POST, posts})