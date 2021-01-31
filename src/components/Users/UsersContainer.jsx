import {connect} from 'react-redux'
import { follow,  unfollow, setSelectedPage,setFollowingProgress,getUsersThunk,UnFollowThunk,FollowThunk } from './usersreducer'
import React from 'react'
import Users from './Users'
import {WithAuthRedirect} from '../hoc/Authredirect'
import { compose } from 'redux'
import { LoadProfile } from "../Profile/profile-reducer";


class UsersSecondary extends React.Component{
     
    componentDidMount(){
        this.props.getUsersThunk(this.props.SelectedPage,this.props.pageSize)
    }
    
    onHandlerPage = (e)=>{
        this.props.getUsersThunk(e,this.props.pageSize)
        }
    render=()=>{   
                return(
                <Users props={this.props} 
                onHandlerPage={this.onHandlerPage} 
                />
            )
    }
}

let mapStatetoProps = (state)=>{
    return{
        users: state.usersPage.users,
        portionSize: 10,
        pageSize: state.usersPage.pageSize,
        totalcount: state.usersPage.totalcount,
        selectedPage: state.usersPage.selectedPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}

let mapDispatchtoProps={
    follow,
    unfollow,
    setSelectedPage,
    setFollowingProgress,
    getUsersThunk,
    FollowThunk,
    UnFollowThunk,
    LoadProfile
    }

export default  compose(
    connect(mapStatetoProps,mapDispatchtoProps),
    WithAuthRedirect
)
(UsersSecondary)

