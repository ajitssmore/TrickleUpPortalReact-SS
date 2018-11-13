import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class InActiveOperationalUserTable extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.operationalUsers}
        pagination={this.props.operationalUsers.length > 0 ? true : false}
        search={true}
        options={this.props.sortingOptions}
        exportCSV={true}
        csvFileName="InActive_OperationalUserList.csv"
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Name"
          headerAlign="left"
          width="40"
          csvHeader="Name"
          dataSort={true}
        >
          Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="PhoneNumber"
          headerAlign="left"
          width="40"
          csvHeader="Phone Number"
          dataSort={true}
        >
          Phone Number
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="UserId"
          headerAlign="left"
          width="40"
          csvHeader="Email Id"
          dataSort={true}
        >
          Email Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Age"
          csvHeader="Age"
          export={true}
          hidden
        />
        <TableHeaderColumn
          dataField="GenderName"
          csvHeader="Gender"
          export={true}
          hidden
        />
        <TableHeaderColumn
          dataField="StateName"
          csvHeader="State"
          export={true}
          hidden
        />
        <TableHeaderColumn
          dataField="DistrictName"
          csvHeader="District"
          export={true}
          hidden
        />
        <TableHeaderColumn
          dataField="GrampanchayatName"
          csvHeader="Grampanchayat"
          export={true}
          hidden
        />
        <TableHeaderColumn
          dataField="VillageName"
          csvHeader="Village"
          export={true}
          hidden
        />
        <TableHeaderColumn
          dataField="LanguageName"
          csvHeader="Language"
          export={true}
          hidden
        />
        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onDeleteBeneficiary}
          headerAlign="left"
          width="20"
          export={false}
        >
          Activate
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default InActiveOperationalUserTable;
