
import { connect } from 'react-redux'
import { selectMenuItem } from '../../state/actions'
import Menu from './menu'




const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}


const mapDispatchToProps = {
    selectMenuItem
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)







