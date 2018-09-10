import React from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'



class HTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.makeTable = this.makeTable.bind(this);
        this.makeOneRow = this.makeOneRow.bind(this);
        this.makeAllRows = this.makeAllRows.bind(this);
        this.setCursor = this.setCursor.bind(this);
    

    }


    componentDidMount() {

        this.props.mdxConnect();

    
    }


    setCursor(line, column)
    {
        var txtarea = document.getElementById("mdx-query");

        var txt = txtarea.value;

        var lines = txt.split("\n")
        var numLines = lines.length;

        var lcounter = 0;
        var findPos = 0;
        while(lcounter<numLines && lcounter+1<line){
            findPos = findPos + lines[lcounter].length
            lcounter++;            
        }

        findPos = findPos + column + 1


        txtarea.focus()
        txtarea.selectionStart = findPos
        txtarea.selectionEnd = findPos
    
    }


    getDataHandler() {

        var mdx = `


        SELECT {[HFM Account].[HFM Main].&[PL0100],[HFM Account].[HFM Main].&[PL1010]}*{[Scenario].[Scenario].&[ACT]}
        ON 0,
       [Profitcenter].[Profitcenter].&[31026].CHILDREN *[Time].[Year - Quarter - Month].[Month].&[2017-05] ON 1
       FROM EDW
       WHERE
       ([Time].[Year].&[2017])
       
         
        `        
        this.setCursor(2,5)


         this.props.mdxQuery(mdx);

    }



    makeOneRow(d){
        return d.map(item => {
               return (<td>{item.value}</td>)
        }) ;

    }


    makeAllRows(rows){
        return rows.map(r => {
            return <tr>{this.makeOneRow(r)}</tr>
        });
    }
    

    makeTable(){

        var tableData =  this.props.mdxRes ? this.props.mdxRes.measures : null;
        if(!tableData)
            tableData = [];


        return (
            <table>
                {this.makeAllRows(tableData)}
            </table>
        )
    }


    render() {

        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <h1>Tabell</h1>
                        </Col>
                    </Row>
            
               

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Enter Query:</ControlLabel>
                        <FormControl id={"mdx-query"} className={"text-nowrap"} style={{ height: 200 }} componentClass="textarea" placeholder="write query here..." />
                    </FormGroup>
        
                    <Row> <hr /> </Row>
                    <Row>
                        <Col md={2}>
                            <Button bsSize="small" onClick={() => this.getDataHandler()}>Execute</Button>
                        </Col>
                    </Row>
                    <Row> <hr /> </Row>
                    <Row>
                      {this.makeTable()}
                    </Row>
                </Grid>
            </div>


        );
    }
}




export default HTable;

