
import React from 'react';
import './menu.css'





class Menu extends React.Component {


    handleClick(item) {
        this.props.selectMenuItem(this.props.menuId, item.key)

        if (typeof item.action === 'function')
            item.action();
        else if (typeof item.action === 'string')
            this.props.setLink(item.action)
    }

    render() {
        if(!this.props.menu)
            return null

        let myMenu = this.props.menu[this.props.menuId]
        if(!myMenu)
            return null

        let selectedId = myMenu.selected

        return myMenu.menuList.map(item => (
            <div className="menu-item" key={item.key} onClick={() => this.handleClick(item)}>
                <div className="menu-box" >
                    <a><div className={item.key===selectedId ?  "active" : ""}> {item.description}</div></a>
                </div>
            </div>
        ))

    }
}




export default Menu;

