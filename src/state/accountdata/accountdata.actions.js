import {BixitApi} from '../../libs/bixitapi'
import {startRequests, endRequests} from '../reqpending/reqpending.actions'


export const CLEAR_ACC_DATA = 'ACCOUNTDATA_CLEAR'
export const SET_TABLE_DATA = 'ACCOUNTDATA_GET_TABLE_DATA'
export const SET_GRAPH_DATA = 'ACCOUNTDATA_GET_GRAPH_DATA'
export const SET_GRAPH_TYPE = 'ACCOUNTDATA_SET_GRAPH_TYPE'






export function clearAccountingData() {
    return { type: CLEAR_ACC_DATA }
}


export function setGraphType(graphType) {
    return { type: SET_GRAPH_TYPE, graphType: graphType }
}


export function setTableData(month, unit, data) {
    return { type: SET_TABLE_DATA, month: month, unit:unit, data: data }
}



export function setGraphData(month, unit, data) {
    return { type: SET_GRAPH_DATA, month: month, unit:unit, data: data }
}



export function getTableData(month, unit){
    return (dispatch) => {
        dispatch(startRequests())

        BixitApi.getAccountsData(month, unit)
        .then(res => {
            dispatch(endRequests());            
            dispatch(setTableData(month, unit, res))
        })
        .catch( err => {
            dispatch(endRequests())
            alert("No response from back-end server") 
        });

    };

}


export function getGraphData(month, unit){
    return (dispatch) => {
        dispatch(startRequests())

        BixitApi.getGraphData(month, unit)
        .then(res => {
            dispatch(endRequests());            
            dispatch(setGraphData(month, unit, res))
        })
        .catch( err => {
            dispatch(endRequests())
            alert("No response from back-end server") 
        });

        
    }
}



