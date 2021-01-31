import * as axios from 'axios'

const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL,
    headers : {
    'API-KEY': '7863dfcd-b874-4e7f-9ca1-7bde0d3614e0'
    }
})

const getUsers = (selectedPage = 1, pageSize = 10)=>{
return instance.get(`users
?page=${selectedPage}&
count=${pageSize}`,{
    withCredentials: true
}).then(response=>response.data)
}

export default getUsers

export const getFollow = (userId)=>{
    return instance.post(`follow/${userId}`)
}
export const getUnFollow = (userId)=>{
    return instance.delete(`follow/${userId}`)
}
export const AuthAPI = {
    me() {
        return  instance.get(`auth/me`)
    },
    login(email,password,rememberMe = false, captcha = null) {
        return instance.post(`auth/login`,{email,password,rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const ProfileApi = {
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status){
        return instance.put(`profile/status`,{status})
    },
    getProfile(userId){
        return instance.get(`profile/${userId}`)
    },
    loadPhoto(photoFile){
        const formdata = new FormData
        formdata.append('image', photoFile)
        return instance.put(`profile/photo`, formdata,{ headers :{'Content-type': 'multipart/form-data'}})
    },
    loadInformation(profile){
        return instance.put(`profile`,profile)
    }

}

export const securityApi = {
    getCaptcha(){
        return instance.get('security/get-captcha-url')
    }
}