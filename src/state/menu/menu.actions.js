



export const MENU_CLEAR = 'MENU_CLEAR'
export const MENU_ADDITEM = 'MENU_ADDITEM'
export const MENU_SELECT_ITEM = "MENU_SELECT"



export function clearMenu(menuId) {
    return { type:MENU_CLEAR, menuId: menuId }
}



export function addMenuItem(menuId, description, action) {
    return { type: MENU_ADDITEM, menuId: menuId,  description: description, action: action}
}


export function selectMenuItem(menuId, key) {
    return { type: MENU_SELECT_ITEM, menuId: menuId, key:key}
}



