import React from 'react';
import { Grid, Row, Col, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { Line, Bar } from 'react-chartjs-2';

import TreeViewDropDown from '../treeviewdropdown/treeviewdropdown.container'








class Graph extends React.Component {


    handleChangeGraphType(e) {
        this.props.setGraphType(e)
    }


    getDataHandler() {
        this.props.getGraphData(this.props.timeSelected.id, this.props.orgUnitsSelected.id)
    }


    handleChangeSelect(e){
        this.props.clearAccountingData();
    }



    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h1>Graf utvikling</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <TreeViewDropDown   header="Velg måned:" domain="time" 
                                            childOnly={true} 
                                            tree={this.props.timeTree} 
                                            selected={this.props.timeSelected}
                                            selChange={(e)=>this.handleChangeSelect(e)} />
                    </Col>
                    <Col md={4}>
                        <TreeViewDropDown   header="Velg organisasjonsenhet:" 
                                            showRoot={true} 
                                            domain="orgunits" 
                                            tree={this.props.orgUnitsTree} 
                                            selected={this.props.orgUnitsSelected}
                                            selChange={(e)=>this.handleChangeSelect(e)} />
                    </Col>
                </Row>
                <Row>
                    <ToggleButtonGroup type="radio" name="graphtype" onChange={(e) => this.handleChangeGraphType(e)} value={this.props.graphType}>
                        <ToggleButton value={"line"}>Linjediagram</ToggleButton>
                        <ToggleButton value={"bar"}>Søylediagram</ToggleButton>
                    </ToggleButtonGroup>
                </Row>
                <Row>
                    <Col md={2}>
                        <Button bsSize="small" onClick={() => this.getDataHandler()}>Vis graf</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                    {this.props.graphData ?
                        (this.props.graphType === "bar" ?
                            <Bar data={this.props.graphData.data} options={this.props.graphData.options} onChange={this.changeHandler} />
                            :
                            <Line data={this.props.graphData.data} options={this.props.graphData.options} onChange={this.changeHandler} />
                        )
                        : null}
                    </Col>
                </Row>
            </Grid>

        );
    }
}




export default Graph;

