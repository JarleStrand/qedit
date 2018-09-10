
import { connect } from 'react-redux'
import Spinner from './spinner'





const mapStateToProps = state => {
  return {
    isLoading: state.reqpending.count>0
  }
}


const mapDispatchToProps =  {
}



export default connect(
  mapStateToProps,
  mapDispatchToProps, null,  { pure: false }
)(Spinner)





