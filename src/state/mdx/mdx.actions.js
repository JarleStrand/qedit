import {BixitApi} from '../../libs/bixitapi'
import {startRequests, endRequests} from '../reqpending/reqpending.actions'


export const MDX_SETCONNECTED = 'MDX_CONNECTED'
export const MDX_SETDATA = 'MDX_SETDATA'





export function mdxSetConnected() {
    return { type: MDX_SETCONNECTED }
}


export function mdxSetData(d) {
    return { type: MDX_SETDATA, data: d }
}


export function mdxConnect(){
    return (dispatch) => {
        dispatch(startRequests())

        BixitApi.connectCube()
        .then(res => {
            dispatch(endRequests());         
            dispatch(mdxSetConnected())
        })
        .catch( err => {
            dispatch(endRequests())
            alert("Cant connect to cube server") 
        });


    }
}

export function mdxQuery(q){
    return (dispatch) => {
        dispatch(startRequests())

        BixitApi.queryCube(q)
        .then(res => {
            dispatch(endRequests());            
            dispatch(mdxSetData(res))
        })
        .catch( err => {
            dispatch(endRequests())
            alert("No response from back-end server") 
        });

    };

}



