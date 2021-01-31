import React from 'react'
import './status.css'

class ProfileStatus extends React.Component{
    state = {
        editMode: false,
        status: !this.props.status && 'Put status'
    }
    
    ActivateStatus = ()=>{
        this.setState(state=>({editMode: !state.editMode}))
    } 
    DeActivateStatus = ()=>{
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    } 

    SendStatus = (e)=>{
        this.setState({status: e.currentTarget.value})
    }
    
    render(){
    return (
        <div className='status' >
            {!this.state.editMode &&
                <div><span onDoubleClick={this.ActivateStatus}>{this.state.status}
                </span></div>
            }
            {this.state.editMode &&
                <div><input onChange={e=>this.SendStatus(e)} autoFocus={true} onBlur={(e)=>this.DeActivateStatus(e)} 
                value={this.state.status}/>
                </div>
            }
        </div>
    )
}
}

export default ProfileStatus
