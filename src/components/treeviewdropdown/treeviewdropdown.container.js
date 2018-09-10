
import { connect } from 'react-redux'
import { treeToggleExpandNode, treeSelectTreeNode } from '../../state/actions'
import  TreeViewDropDown from './treeviewdropdown'




const mapStateToProps = state => {
  return {

  }
}


const mapDispatchToProps =  {
    treeToggleExpandNode,
    treeSelectTreeNode
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeViewDropDown)



