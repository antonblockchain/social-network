import React, { Component } from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { setStatusThunk, updateStatusThunk, LoadProfileThunk, choosePhoto, LoadInformation} from './profile-reducer'
import { withRouter } from 'react-router-dom'
import { WithAuthRedirect } from '../hoc/Authredirect'
import { compose } from 'redux'


class ProfileContainer extends Component {
    refreshProfile(){
        
        let userId = this.props.match.params.userId
            if(!userId){ 
                
            userId = 12886
            this.props.LoadProfile(userId)
        }
        
        this.props.setStatusThunk(userId)
    }

    componentDidMount(){
        this.refreshProfile()
   
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.match.params.userId !==prevProps.match.params.userId)
        this.refreshProfile()
    }

    render() {
        // debugger
        return (
            <div>
                <Profile 
                {...this.props}
                IsOwner={!this.props.match.params.userId} 
                user={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusThunk}/>
            </div>
        )
    }
}

let MapPropsToState = (state)=>({
    user: state.usersPage.users,
     userid: state.usersPage.users.map(e=>e.id), 
     status: state.profilePage.status,
      isAuth: state.auth.isAuth,
      profile: state.profilePage.profile,
      authorizedUser: state.auth.authorizedUser
      })

export default compose(
    connect(MapPropsToState,{ setStatusThunk, updateStatusThunk, LoadProfile: LoadProfileThunk, choosePhoto, LoadInformation}),
    withRouter,
    WithAuthRedirect
)
(ProfileContainer)

