


import { connect } from 'react-redux'
import HTable from '../htable/htable'
import { mdxConnect, mdxQuery, mdxClearData } from '../../state/actions'




const mapStateToProps = state => {
  return {
    mdxRes: state.mdxstate.data ? state.mdxstate.data : null
  }
}


const mapDispatchToProps =  {
  mdxConnect,
  mdxClearData,
  mdxQuery
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HTable)



