import React from 'react';
import {
    withRouter
} from 'react-router-dom'
import PropTypes from 'prop-types'
import './mainpage.css'
import Menu from '../menu/menu.container'
import HTable from '../htable/htable.container'






class ProtoMainPage extends React.Component {


    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }



    constructor(props, context) {
        super(props, context);

        this.state = {
            currLink: ""
        }

        this.setLink = this.setLink.bind(this)
    }

    componentDidMount() {

    

        // define main menu with links, and redirect to account page
        this.props.clearMenu("mainmenu");
 
        this.props.addMenuItem("mainmenu", "Query", "/query")
        this.props.selectMenuItem("mainmenu", 0)


        
        this.setLink("/query")
    }


    setLink(link) {
        this.setState({ currLink: link })
        this.props.history.push(link)
    }


    render() {

        return (
            <div className="page">
                <span className="mainpage-mainpanel">
                    {this.state.currLink === "/query" ? <HTable /> : null}
                </span>
                <span className="mainpage-sidepanel" >
                    <div className="filler" />

                    <div className="filler" />

                    <div className="smallfiller" />
                    <Menu menuId="mainmenu" setLink={this.setLink} />
                </span>
            </div>
        );
    }
}


const MainPage = withRouter(ProtoMainPage)

export default MainPage;

