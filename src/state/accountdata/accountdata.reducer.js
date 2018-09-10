
import { CLEAR_ACC_DATA, SET_TABLE_DATA, SET_GRAPH_DATA, SET_GRAPH_TYPE } from './accountdata.actions'



const accountdata = (state, action) => {
    let newState
    switch (action.type) {
        case CLEAR_ACC_DATA:
            return { graphType: state.graphType };

        case SET_TABLE_DATA:
            if (state.month !== action.month || state.unit !== action.unit)
                newState = { month: action.month, unit: action.unit, graphType: state.graphType }
            else
                newState = { ...state }
            newState.tableData = action.data
            return newState;

        case SET_GRAPH_DATA:
            if (state.month !== action.month || state.unit !== action.unit)
                newState = { month: action.month, unit: action.unit, graphType: state.graphType }
            else
                newState = { ...state }
            newState.graphData = action.data
            return newState;

        case SET_GRAPH_TYPE:
            return {...state, graphType: action.graphType }

        default:
            if (typeof (state) === 'undefined')
                return { graphType: "line" }
            else
                return state;
    }

}


export default accountdata;



