import React, { Suspense } from 'react'
import Loader from '../common/Loader'

export default (WrappedComponent) => {



return (props,isAuth = undefined)=><Suspense fallback={<Loader />}>
        <WrappedComponent {...props} isAuth={isAuth ? props.state.auth.isAuth : ''}/>
        </Suspense>


}
