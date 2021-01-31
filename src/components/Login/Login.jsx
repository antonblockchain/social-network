import React from 'react';
import { Field, reduxForm} from 'redux-form'
import { Input } from '../Posts/Textaera';
import {connect} from 'react-redux'
import {LoginThunk, LogoutThunk} from './auth-reducer'
import { Redirect } from 'react-router-dom';
import {requiredField} from '../../utils/validation'
import {createField} from '../common/FormControls'

const LoginForm = (props)=>{


    const submit = props.handleSubmit

    return (
        <form onSubmit={submit}>
        <div>
        <label>Login</label>
        <Field component={Input} name='email' validate={[requiredField]}/>
        </div>
        <div>
        <label>Password</label>
        <Field component={Input}  name='password' type='password' validate={[requiredField]}/>
        </div>
        <div>
            <Field type='checkbox' component={Input}  name='rememberMe' />
        </div>
        <div>
            <button>LOGIN</button>
        </div>
        {props.captchaUrl && <div> <img src={props.captchaUrl} />
           {createField('symbols','captcha', [requiredField], Input, {})}
           </div>}
    </form>
    )
}

const ContactForm = reduxForm({
form:'loginn'
}) (LoginForm)

function Login(props) {
    const onSubmit = (FormData)=>{
        props.LoginThunk(FormData.email,FormData.password,FormData.rememberMe, FormData.captcha)
    }

    if(props.isAuth){
        return <Redirect to='/dialog'/>
    }
    else{
    return (
        <div>
            <h1>Login</h1>
           <ContactForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
           
        </div>
    )
}
}

let MapStatetoProps = (state)=>({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(MapStatetoProps,{LoginThunk})(Login)

