
import { connect } from 'react-redux'
import { doLogout, clearMenu, addMenuItem, selectMenuItem, getTimeDim, getOrgUnitsDim, clearAccountingData } from '../../state/actions'
import MainPage from '../mainpage/mainpage'





const mapStateToProps = state => {
  return {
    userName: state.auth.name,
  }
}


const mapDispatchToProps =  {
    clearMenu,
    addMenuItem,
    selectMenuItem,    
    doLogout,
    getTimeDim,
    getOrgUnitsDim,
    clearAccountingData
}



export default connect(
  mapStateToProps,
  mapDispatchToProps, null,  { pure: false }
)(MainPage)





