import React from 'react'
import src from '../images/2.jpg'
import { WithAuthRedirect } from '../hoc/Authredirect'
import { Field, reduxForm } from 'redux-form'
import Textaera from '../Posts/Textaera'
import { maxLength15 } from '../../utils/validation'


const DialogForm = (props)=>{

    const submit = props.handleSubmit

    return (
        <form onSubmit={submit}>
        <div>
        <label>Login</label>
        <Field component={Textaera} name='message'
        validate={maxLength15}
        placeholder='dunno'
        />
        </div>
        <div>
            <button>LOGIN</button>
        </div>
    </form>
    )
}

const MessageForm = reduxForm({
    form:'message'
    }) (DialogForm)
    

function Dialogs(props){
   const Addmessage = (data)=>{
       alert(data.message)
   }
    
    return(
        <div>
            <header>
                <h1>{props.title}</h1>
            </header>
            <img src={src}/>
            <MessageForm onSubmit={Addmessage}/>
        </div>
    )
}


let Dialog = WithAuthRedirect(Dialogs)
export default Dialog