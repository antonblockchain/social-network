import React, { useEffect, useState } from 'react'
import src from '../images/1.jpg'
import Preloader from '../common/Preloader'
import ProfileStatus from '../Status/ProfileStatus'

//With local state

export default function Profile(props){

const [editmode,setEdit] = useState(false)
const [aboutMe,setAboutMe] = useState('')
const [lookingforjob,setLooking] = useState(false)
const [fullName,setfullName] = useState('')
const [lookingforjobdesc,setLookingDesc] = useState('')

useEffect(()=>{
    setEdit(false)

    if(props.profile){
    setLooking(props.profile.lookingForAJob)
    setAboutMe(props.profile.aboutMe)
    setfullName(props.profile.fullName)
    setLookingDesc(props.profile.lookingForAJobDescription)
    }
},[props.profile])
const filehandler = (e)=>{
    console.log(e)
    if(e.target.files.length){
        props.choosePhoto(e.target.files[0])
    }
}

const saveChanges = ()=>{
    setEdit(!editmode)

    if(editmode)
    props.LoadInformation({aboutMe: aboutMe, lookingForAJob: lookingforjob, fullName: fullName, lookingForAJobDescription: lookingforjobdesc})
}
if(!props.user || props.user == []){
        return <Preloader />
}  
    console.log(lookingforjob)
    return(
        <div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            <header>
            </header>
            <img src={props.user.photos.large ? props.user.photos.large : src}/>
            <h1>General information</h1>
            <div >
                <button disabled={!props.IsOwner ? true : false} onClick={()=>{saveChanges()}}>{editmode ? 'Save' : 'Edit'}</button>
                {!editmode ? <div>
                <p>Name: {fullName}</p>
                <p>About me: {aboutMe}</p>
                <p>Looking for job: {lookingforjob ? 'yes' : 'no'}</p>
                <p>Descripton : {lookingforjobdesc}</p>
                </div> 
                : 
                <div>
                <input value={fullName} onChange={(e)=>{setfullName(e.target.value)}}/>
                <input value={aboutMe} onChange={(e)=>{setAboutMe(e.target.value)}}/>
                <input value={lookingforjob} onChange={()=>{setLooking(!lookingforjob)}} type='checkbox'/>
                <input value={lookingforjobdesc} onChange={(e)=>{setLookingDesc(e.target.value)}}/>

                </div>
                }
                {Object.keys(props.profile.contacts).map(e=>{
                    return <p>{e}: {props.profile.contacts[e]}</p>
                })}
                </div>
            {props.IsOwner && <input type='file'  accept=".jpg, .jpeg, .png" onChange={e=>{filehandler(e)}} />}
        </div>
    )
        
}

//With redux form (in development)

//  ProfileReduxForm = (props)=>{
    
//     const [editmode,setEdit] = useState(false)

//     const filehandler = (e)=>{
//         console.log(e)
//         if(e.target.files.length){
//             props.choosePhoto(e.target.files[0])
//         }
//     }
    
//     const saveChanges = ()=>{
//         setEdit(!editmode)
    
//         if(editmode)
//         props.LoadInformation({aboutMe: aboutMe, lookingForAJob: lookingforjob, fullName: fullName, lookingForAJobDescription: lookingforjobdesc})
//     }
//     if(!props.user || props.user == []){
//             return <Preloader />
//     }  
    
//         return(
//             <div>
//                 <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
//                 <header>
//                 </header>
//                 <img src={props.user.photos.large ? props.user.photos.large : src}/>
//                 <h1>General information</h1>
//                 <div >
//                     <button disabled={!props.IsOwner ? true : false} onClick={()=>{saveChanges()}}>{editmode ? 'Save' : 'Edit'}</button>
//                     {!editmode ? <div>
//                     <p>Name: {fullName}</p>
//                     <p>About me: {aboutMe}</p>
//                     <p>Looking for job: {lookingforjob ? 'yes' : 'no'}</p>
//                     <p>Descripton : {lookingforjobdesc}</p>
//                     </div> 
//                     : 
//                     <div>
//                     <input value={fullName} onChange={(e)=>{setfullName(e.target.value)}}/>
//                     <input value={aboutMe} onChange={(e)=>{setAboutMe(e.target.value)}}/>
//                     <input value={lookingforjob} onChange={()=>{setLooking(!lookingforjob)}} type='checkbox'/>
//                     <input value={lookingforjobdesc} onChange={(e)=>{setLookingDesc(e.target.value)}}/>
    
//                     </div>
//                     }
//                     {Object.keys(props.profile.contacts).map(e=>{
//                         return <p>{e}: {props.profile.contacts[e]}</p>
//                     })}
//                     </div>
//                 {props.IsOwner && <input type='file'  accept=".jpg, .jpeg, .png" onChange={e=>{filehandler(e)}} />}
//             </div>
//         )
            

// }