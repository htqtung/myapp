import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './App.css';

class TodoTable extends Component {

  render() {
    return(
      <div className="App">
        <div>
          <br/>
          <h4>To do list </h4>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false}>
              <TableHeaderColumn>
                Date
              </TableHeaderColumn>
              <TableHeaderColumn>
                Description
              </TableHeaderColumn>
              <TableHeaderColumn>
                
              </TableHeaderColumn>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.todos.map((item, index) =>
                <TableRow key={index}>
                  <TableRowColumn>{item.date}</TableRowColumn>
                  <TableRowColumn>{item.description}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton 
                      onClick={this.props.deleteTodo} 
                      primary={false} 
                      secondary={true}
                      label="Delete" />
                  </TableRowColumn>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>        
      </div>
    )
  }
}

export default TodoTable;
