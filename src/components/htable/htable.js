import React from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'



class HTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
                querytext: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.makeTable = this.makeTable.bind(this);
        this.makeOneRow = this.makeOneRow.bind(this);
        this.makeAllRows = this.makeAllRows.bind(this);
        this.setCursor = this.setCursor.bind(this);
        this.convertResToTable = this.convertResToTable.bind(this);
    

    }


    componentDidMount() {

        this.props.mdxConnect();

    
    }



    handleChange(e) {
        if(this.props)
            this.props.mdxClearData();
        if(e)
            this.setState({ querytext: e.target.value });
    }


    setCursor(line, column)
    {
        var txtarea = document.getElementById("mdx-query");

        var txt = this.state.querytext;

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


        if(this.state.querytext.length>0){
            this.props.mdxQuery(this.state.querytext);

        }

    }



    makeOneRow(d){
        return d.map(item => {
               return (<td>{item}</td>)
        }) ;

    }


    makeAllRows(rows){
        return rows.map(r => {
            return <tr>{this.makeOneRow(r)}</tr>
        });
    }
    

    makeTable(tableData){

        if(!tableData)
            tableData = [];


        return (
            <table border="1">
                {this.makeAllRows(tableData)}
            </table>
        )
    }


    convertResToTable(){
        if(this.props.mdxRes){
            var axisList = this.props.mdxRes.axis;
            var measures = this.props.mdxRes.measures;            
            var colDims = axisList[0][0].length
            var rowDims = axisList[1][0].length
            var colWithMeasures = measures[0].length
            var rowWithMeasures = measures.length            


            var i
            var j
            var line

            var table = [];
            for(i =0; i< rowDims; i++){
                line = [];
                for(j=0; j<colDims; j++)
                    line.push("");
                for(j=0; j<colWithMeasures; j++)
                    line.push(axisList[1][j][i].name);

                table.push(line)
            }

            for(i=0; i<rowWithMeasures; i++){
                line = [];
                for(j=0; j<colDims; j++)
                    line.push(axisList[0][i][j].name);
                for(j=0; j<colWithMeasures; j++)
                    line.push(measures[i][j].value);

                table.push(line)

            }

            return table;
        }
        else
            return [];

    }


    render() {

        if(this.props.mdxRes && this.props.mdxRes.error){
            this.setCursor(this.props.mdxRes.error.line, this.props.mdxRes.error.column)
        };

        return (
            <div>
                <Grid>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Enter Query:</ControlLabel>
                        <FormControl id={"mdx-query"} spellcheck="false" className={"text-nowrap"} style={{ height: 200 }} componentClass="textarea" placeholder="write query here..." 
                            value={this.state.querytext} onChange={this.handleChange}/>
                    </FormGroup>
                    <Row>
                        <Col md={2}>
                            <Button bsSize="small" onClick={() => this.getDataHandler()}>Execute</Button>
                        </Col>
                    </Row>
                    <Row> <hr /> </Row>
                    <Row>
                      {this.props.mdxRes && this.props.mdxRes.error? this.props.mdxRes.error.text : this.makeTable(this.convertResToTable())}
                    </Row>
                </Grid>
            </div>


        );
    }
}




export default HTable;

