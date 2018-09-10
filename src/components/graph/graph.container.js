


import { connect } from 'react-redux'
import Graph from './graph'
import { getGraphData, setGraphType, clearAccountingData } from '../../state/actions'




const mapStateToProps = state => {
  return {
    timeTree: state.trees.time ? state.trees.time.tree : null,
    timeSelected: state.trees.time ? state.trees.time.selected : null,
    orgUnitsTree: state.trees.orgunits ? state.trees.orgunits.tree : null,
    orgUnitsSelected: state.trees.orgunits ? state.trees.orgunits.selected : null,        
    graphData: state.accountdata.graphData,
    graphType: state.accountdata.graphType
  }
}


const mapDispatchToProps =  {
  getGraphData,
  setGraphType,
  clearAccountingData  
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Graph)

