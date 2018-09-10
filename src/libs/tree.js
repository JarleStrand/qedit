

export class TreeAlgorithms{


    // helper function - find first item in list with given parentId
    static _findItemWithParentId(list, parentIdName, parentIdValue){
        if(!list)
            return null

        for(var l of list){
            if(l[parentIdName]===parentIdValue)
                return l
        }
        return null;

    }


    // helper function - recursively insert children from list
    static _insertChildrenRecursively(root, list, idName, parentIdName, descriptionName){
        if(!root)
            return

        let findId = root.id

        for(var l of list){
            if(l[parentIdName]===findId){
                let child = { id: l[idName], name: l[descriptionName], selected: false, expanded: false,  children: []}
                root.children.push(child)
                this._insertChildrenRecursively(child, list, idName, parentIdName, descriptionName)
            }
        }
    }


    // helper function - recursively copy children from tree
    static  _copyChildrenRecursively(root, childList){
        if(!root)
            return

        for(var c of childList){
            let child = { id: c.id, name: c.name, selected: c.selected, expanded: c.expanded, key: c.key, children: []}
            root.children.push(child)
            this._copyChildrenRecursively(child, c.children)
        }
    }


    // helper function - recursively expand nodes in tree from root until child with id is found
    static _expandToNode(tree, id){
        if(!tree)
            return

        if(tree.id===id)
            return true // we found the id, we are done,  so no need to go through all children

        // recursively do all children, but stop when id node is found
        let numChildren = tree.children.length
        let found = false
        let i =0
        while(!found && i<numChildren){
            if(this._expandToNode(tree.children[i], id))
                found = true
            i++
        }

        if(found && tree.children.length!==0)
              tree.expanded = true

        return found
    }



    // helper function - insert key prop in each node
    static _setKeyValuesRecursively(tree, startKey){ 
        if(!tree)
            return startKey

        tree.key = startKey
        let currKey = startKey + 1


        for(var c of tree.children)
            currKey = this._setKeyValuesRecursively(c, currKey)

        return currKey
    }
        
    


    // convert list from bixit api to tree for this app
    static getTreeFromList(list, idName, parentIdName, parentIdRootValue, descriptionName){
        if(!list || list.length===0)
            return null

        let root = null;

        let item = this._findItemWithParentId(list, parentIdName, parentIdRootValue);
        if(!item)
            return root

        root = { id: item[idName], name: item[descriptionName], selected: false, expanded: false,  children: []}
        this._insertChildrenRecursively(root, list, idName, parentIdName, descriptionName)

        return root
    }



    static getTreeCopy(tree){

        if(!tree)
            return null;

        let root = { id: tree.id, name: tree.name, selected: tree.selected, expanded: tree.expanded, key: tree.key, children: []}
        this._copyChildrenRecursively(root, tree.children)

        return root
    }



    static removeExpands(tree, id){
        if(!tree)
            return

        tree.expanded = false;

        // recursively do all children
        for(var c of tree.children)
            this.toggleExpand(c, id);

        return tree;
    }



    static toggleExpand(tree, id){
        if(!tree)
            return

        if(tree.id===id && tree.children.length!==0)
            tree.expanded = !tree.expanded;

        // recursively toggle in all children
        for(var c of tree.children)
            this.toggleExpand(c, id);

        return tree
    }



    static setSelected(tree, id){
        if(!tree)
            return

        tree.selected = tree.id ===id

        // recursively update in all children
        for(var c of tree.children)
            this.setSelected(c, id)

        return tree
    }



    static expandToAndSelect(tree, id){
        this.removeExpands(tree, id)
        this.setSelected(tree, id)
        this._expandToNode(tree,id)

        return tree
    }


    // get Node with given id from tree
    static getNode(tree, id){ 
        if(tree.id===id)
            return tree

        let numChildren = tree.children.length
        let i =0
        let resNode = null
        while(resNode===null && i<numChildren){
            resNode = this.getNode(tree.children[i], id)
            i++
        }

        return resNode
    }


        // insert key prop in each node
        static setKeyValues(tree){ 
            if(tree)
                this._setKeyValuesRecursively(tree, 0)
        }
    
    

}


export default TreeAlgorithms;
