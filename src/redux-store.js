import {applyMiddleware, combineReducers, createStore} from 'redux'
import usersreducer from './components/Users/usersreducer'
import { ProfileReducer } from './components/Profile/profile-reducer'
import authReducer from './components/Login/auth-reducer'
import Thunk from 'redux-thunk'
import {reducer as Formreducer} from 'redux-form'
import {PostReducer} from './components/Posts/postsreducer'
let reducers = combineReducers({
    usersPage: usersreducer,
    profilePage: ProfileReducer,
    auth: authReducer,
    form: Formreducer,
    postsreducer: PostReducer
})


let store = createStore(reducers, applyMiddleware(Thunk))

export default store