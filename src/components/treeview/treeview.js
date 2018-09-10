
import React from 'react'
import './treeview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'



class TreeView extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.getChildrenRecursively = this.getChildrenRecursively.bind(this)
        this.renderNode = this.renderNode.bind(this)
        this.toggleNode = this.toggleNode.bind(this)
        this.selectNode = this.selectNode.bind(this)
    }


    selectNode(node) {
        if(!this.props.childOnly || this.props.childOnly===false || node.children.length===0){
            if(this.props.selChange && this.props.selected.id!==node.id)       
                this.props.selChange(node.id)

            this.props.treeSelectTreeNode(this.props.domain, node.id) 
        }
    }


    toggleNode(node) {
        this.props.treeToggleExpandNode(this.props.domain, node.id)
    }

    
    selectAndClose(node) {
        if(!this.props.childOnly || this.props.childOnly===false || node.children.length===0){
            if(this.props.selChange && this.props.selected.id!==node.id)       
                this.props.selChange(node.id)

            this.props.treeSelectTreeNode(this.props.domain, node.id)     
            this.props.closeMe()   
        }
    }


    renderNode(node) {
        return (
            <div className="treeview-item-one" key={node.key}>
                {node.children && node.children.length > 0 ?
                    <span onClick={() => this.toggleNode(node)} >
                        {node.expanded ? <FontAwesomeIcon icon={faMinusSquare} /> : <FontAwesomeIcon icon={faPlusSquare} />}
                    </span>
                    : null
                }
                <span className={node.selected ? "treeview-selected" : ""}
                    onClick={() => this.selectNode(node)}
                    onDoubleClick={() => this.selectAndClose(node)}>
                    {node.name}
                </span>
                {(node.children && node.children.length !== 0 && node.expanded) ?
                    <div className="treeview-item-one">
                        {this.getChildrenRecursively(node)}</div>
                    : null
                }
            </div>
        )
    }


    getChildrenRecursively(tree) {
        if (!tree || tree.children.length === 0)
            return null

        return tree.children.map(child => {
            return this.renderNode(child)
        })
    }


    render() {
        return this.props.showRoot ?
            (
                <div>
                    {this.renderNode(this.props.tree)}
                    <div className="treeview-item-one">
                        {this.getChildrenRecursively(this.props.tree)}
                    </div>
                </div>
            )
            :
            (
                <div>{this.getChildrenRecursively(this.props.tree)}</div>
            )
    }
}


// ......
export default TreeView;


