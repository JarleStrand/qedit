
import { connect } from 'react-redux'
import { doAuthentication } from '../../state/actions'
import LoginForm from '../login/login'





const mapStateToProps = state => {
  return {
    loggedIn: (state.login && state.login!=="")
  }
}


const mapDispatchToProps = {
    doAuthentication
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)





