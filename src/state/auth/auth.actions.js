import {BixitApi} from '../../libs/bixitapi'
import {persistentStorage} from '../../libs/persistentstorage'
import {startRequests, endRequests} from '../reqpending/reqpending.actions'




export const DO_LOGIN = 'AUTH_LOGIN'
export const DO_LOGOUT = 'AUTH_LOGOUT'




export function doLogin(name, token) {
    persistentStorage.setName(name)
    persistentStorage.setToken(token)
    return { type: DO_LOGIN, name: name, token: token }
}



export function doLogout() {
    persistentStorage.setName("")
    persistentStorage.setToken("")
    return { type: DO_LOGOUT }
}



export function tryLoginOnStart()
{
    return (dispatch)=> {
        let token = persistentStorage.getToken()
        let name = persistentStorage.getName()

        if(token && token!=="" && name && name!=="")
            dispatch(doLogin(name, token))
        else
            dispatch(doLogout())
    
    }
}



export function doAuthentication(name, password){
    return (dispatch) => {
        dispatch(startRequests())

        BixitApi.login(name, password)
        .then(json => {
            dispatch(endRequests());            
            dispatch(doLogin(json.firstName + " " + json.lastName, json.token))
        })
        .catch( err => {
            dispatch(endRequests())
            alert("Wrong username or password, please try again") 
        });

    };

}


