


import { connect } from 'react-redux'
import AccountTable from './accounttable'
import { getTableData, clearAccountingData } from '../../state/actions'




const mapStateToProps = state => {
  return {
    timeTree: state.trees.time ? state.trees.time.tree : null,
    timeSelected: state.trees.time ? state.trees.time.selected : null,
    orgUnitsTree: state.trees.orgunits ? state.trees.orgunits.tree : null,
    orgUnitsSelected: state.trees.orgunits ? state.trees.orgunits.selected : null,    
    tableData: state.accountdata.tableData
  }
}


const mapDispatchToProps =  {
  getTableData,
  clearAccountingData  
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTable)



