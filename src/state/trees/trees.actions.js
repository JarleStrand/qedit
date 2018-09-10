import {BixitApi} from '../../libs/bixitapi'
import {startRequests, endRequests} from '../reqpending/reqpending.actions'


export const SET_TREE_DATA = 'TREE_SETDATA'
export const TOGGLE_EXPAND_NODE = 'TREE_TOGGLE_EXPAND'
export const SELECT_TREE_NODE = 'TREE_SELECT_NODE'
export const GET_TIME_DIM = 'TREE_GET_TIME_DIM'
export const GET_ORGUNITS_DIM = 'TREE_GET_TIME_DIM'
export const EXPAND_SELECT_NODE = 'TREE_EXPAND_AND_SELECT'





export function treeSetData(domain, tree) {
    return { type: SET_TREE_DATA, domain: domain, tree: tree }
}



export function treeToggleExpandNode(domain, id) {
    return { type: TOGGLE_EXPAND_NODE, domain: domain, id: id }
}



export function treeSelectTreeNode(domain, id) {
    return { type: SELECT_TREE_NODE, domain: domain, id: id }
}



export function treeExpandAndSelect(domain, id) {
    return { type: EXPAND_SELECT_NODE, domain: domain, id: id }
}



export function getTimeDim(selectAndExpandNode) {
    return (dispatch) => {
        dispatch(startRequests())

        BixitApi.getTimeDim()
            .then(json => {
                dispatch(endRequests())
                dispatch(treeSetData("time", json))
                if(selectAndExpandNode && selectAndExpandNode!=="")
                    dispatch(treeExpandAndSelect("time", selectAndExpandNode));
            })
            .catch(err => {
                dispatch(endRequests())
                alert("Error getting data from api")
            })
    }
}



export function getOrgUnitsDim(selectAndExpandNode) {
    return (dispatch) => {
        dispatch(startRequests())

        BixitApi.getOrgUnitsDim()
            .then(json => {
                dispatch(endRequests())
                dispatch(treeSetData("orgunits", json))
                if(selectAndExpandNode)
                    dispatch(treeExpandAndSelect("orgunits", selectAndExpandNode));

            })
            .catch(err => {
                dispatch(endRequests())
                alert("Error getting data from api")
            })
    }
}


