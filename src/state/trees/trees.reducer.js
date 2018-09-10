import { SET_TREE_DATA, TOGGLE_EXPAND_NODE, SELECT_TREE_NODE, EXPAND_SELECT_NODE } from '../trees/trees.actions'
import { TreeAlgorithms } from '../../libs/tree'






const trees = (state = {}, action) => {
    let newState
    let newTree
    let newSelected
    switch (action.type) {
        case SET_TREE_DATA:
            TreeAlgorithms.setKeyValues(action.tree)
            newState = {...state,  [action.domain]: { tree: action.tree, selected: null } }
            return newState

        case TOGGLE_EXPAND_NODE:
            if (!state[action.domain])
                return { ...state }
            newState = {...state}
            newTree = TreeAlgorithms.toggleExpand(TreeAlgorithms.getTreeCopy(state[action.domain].tree), action.id)
            newState[action.domain].tree = newTree
            return newState

        case SELECT_TREE_NODE:
            if (!state[action.domain])
                return { ...state }
            newTree = TreeAlgorithms.setSelected(TreeAlgorithms.getTreeCopy(state[action.domain].tree), action.id)
            newSelected = TreeAlgorithms.getNode(newTree, action.id)
            newState = {...state}
            newState[action.domain] = { tree: newTree, selected: newSelected }
            return newState

        case EXPAND_SELECT_NODE:
            if (!state[action.domain])
                return { ...state }
            newTree = TreeAlgorithms.expandToAndSelect(TreeAlgorithms.getTreeCopy(state[action.domain].tree), action.id)
            newSelected = TreeAlgorithms.getNode(newTree, action.id)
            newState = {...state}
            newState[action.domain] = { tree: newTree, selected: newSelected }
            return newState

        default:
            if (typeof (state) === 'undefined')
                return {  }
            else
                return state;
    }

}


export default trees;


