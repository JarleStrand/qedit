
import { connect } from 'react-redux'
import { tryLoginOnStart } from '../../state/actions'

import Gateway from './gateway'






const mapStateToProps = state => {
  return {
    loggedIn: (state.auth && state.auth.token && state.auth.token !== ""),
  }
}


const mapDispatchToProps = {
  tryLoginOnStart
}





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gateway)


