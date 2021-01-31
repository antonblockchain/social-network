import React from 'react'
import { Field } from 'redux-form'
import { maxLength15, requiredField } from '../../utils/validation'
import Textarea from './Textaera'

function Posts(props) {
    return (
        <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name='posts'
        validate={[requiredField, maxLength15]}
        placeholder='hey'
        />
        <button>Send</button>
        </form>
    )
}

export default Posts
