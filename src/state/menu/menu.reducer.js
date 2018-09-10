import { MENU_CLEAR, MENU_ADDITEM, MENU_SELECT_ITEM  } from './menu.actions'



const menu  = (state, action) => {
    let newItem
    let newState
    switch (action.type){

        case MENU_CLEAR:
            newState = {...state}
            if (!state[action.menuId])
                return newState
            delete newState[action.menuId]
            return newState

        case MENU_ADDITEM:
            newState = {...state}
            if (!state[action.menuId]){
                newItem = {description: action.description, action: action.action, key: 0}
                newState[action.menuId] = { menuList: [ newItem], selected: null, keyCount: 1}
            }
            else{
                newItem = { description: action.description, action: action.action, key: state[action.menuId].keyCount}
                newState[action.menuId].menuList = [...state[action.menuId].menuList, newItem]
                newState[action.menuId].keyCount = state[action.menuId].keyCount+1
            }
            return newState

        case MENU_SELECT_ITEM:
            newState = {...state}
            if (!state[action.menuId])
                return newState
            state[action.menuId].selected = action.key
            return newState
            
        default:
            if(typeof(state)==='undefined')
                return {}
            else
                return state;        
    }
}


export default menu;


