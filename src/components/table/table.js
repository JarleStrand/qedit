
import React from 'react'
import './table.css';

class Table extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.renderLine = this.renderLine.bind(this)
    }



    renderLine(line) {
        if(line.type==="") 
            return null
        else return (
         <tr className={line.type==="O" ? "table-headline" : line.type==="L" ? "table-line" : "table-sumline" } key={line.key}>
            <td>{line.description}</td>
            <td className="table-align-right">{line.actual}</td>
            <td className="table-align-right">{line.budget}</td>
            <td className="table-align-right">{line.deviation}</td>
            </tr>
        );
    }



    render() {

        if (!this.props.data)
            return null

        return(
            <table><tbody >
                <tr  >
                    <th></th>
                    <th className="tableStyle">Faktisk</th>
                    <th>Budsjett</th>
                    <th>Avvik</th>
                </tr>
                {this.props.data.map((line) => this.renderLine(line))}
            </tbody></table>
        )
    }
}



export default Table;


