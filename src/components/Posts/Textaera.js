import React from 'react'
import '../../utils/formcontrol.css'

const FormArea = ({input,meta,element,...props})=>{

    const hasError = meta.touched && !input.value
    return (
        <div className={hasError ? 'form-control' : ''}>
                {element==='textarea' ? <textarea {...input} {...props} />
                :  <input {...input} {...props} />}
                {hasError && <div><span>{meta.error}</span></div>}
        </div>
    )
}

function Textaera(props) {
return <FormArea {...props} element='textarea' />
}
export function Input(props) {
return <FormArea {...props} element='input' />
}

export default Textaera
