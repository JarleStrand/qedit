import React from 'react';
import './treeviewdropdown.css';
import { Row, Col } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'


import TreeView from '../treeview/treeview'




class TreeViewDropDown extends React.Component {


    constructor(props, context) {
        super(props, context);


        this.state = {
            showContent: false
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toogleShowContent = this.toogleShowContent.bind(this)
        this.closeContent = this.closeContent.bind(this)
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.state.showContent)
                this.setState({ showContent: false })
        }
    }


    toogleShowContent(evt) {
        this.setState({ showContent: !this.state.showContent })
    }


    closeContent() {
        this.setState({ showContent: false })
    }



    render() {
        return (
            <div className="noSelect">
                <Row>
                    <Col md={12} >
                        {this.props.header}
                    </Col>
                </Row>
                <div ref={this.setWrapperRef}>
                    <Row>
                        <Col md={12} onClick={this.toogleShowContent} >
                            <div className="dd-header">
                                <span className="textpart">{this.props.selected && this.props.selected.name ? this.props.selected.name : ""}</span>
                                {this.state.showContent ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                            </div>
                        </Col>
                        {this.state.showContent ?
                            <Col md={12} >
                                <div className="ddtv-container">
                                    <TreeView domain={this.props.domain}
                                        selected={this.props.selected}
                                        tree={this.props.tree}
                                        showRoot={this.props.showRoot}
                                        treeToggleExpandNode={this.props.treeToggleExpandNode}
                                        treeSelectTreeNode={this.props.treeSelectTreeNode}
                                        childOnly={this.props.childOnly ? this.props.childOnly : false}
                                        closeMe={this.closeContent}
                                        selChange={this.props.selChange} />
                                </div>
                            </Col>
                            : ""}
                    </Row>
                </div>
            </div>
        );
    }
}

export default TreeViewDropDown;
