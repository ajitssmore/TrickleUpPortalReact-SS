import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class ActiveRoleTable extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.Roles}
        pagination={true}
        search={true}
        options={this.props.sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="RoleName"
          headerAlign="left"
          width="30"
          dataSort={true}
        >
          Role Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="edit"
          dataFormat={this.props.onEditState}
          headerAlign="left"
          width="20"
          export={false}
        >
          Edit
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onDeleteState}
          headerAlign="left"
          width="20"
          export={false}
        >
          Deactivate
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
export default ActiveRoleTable;
