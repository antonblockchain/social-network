import React, { Component } from 'react'
import {connect} from 'react-redux'
import Posts from './Posts'
import {reduxForm} from 'redux-form'
import {sendPost} from './postsreducer'

const ContactForm = reduxForm({
    form:'posts'
    }) (Posts)
    
class PostsContainer extends Component {
    render() {
        const onSubmit = (FormData)=>{
            this.props.sendPost(FormData.posts)
        }
        return (
            <div>
                <h1>Posts</h1>
               <ContactForm onSubmit={onSubmit}/>
               {this.props.posts.map((_e,i)=><p key={Math.random()*i*100}>{_e}</p>)}
            </div>
        )
    }
}

let MapStatetoProps = (state)=>({
    posts: state.postsreducer.posts
})

export default connect(MapStatetoProps, {sendPost}) (PostsContainer)