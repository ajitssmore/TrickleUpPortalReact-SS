import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from '../../../components/Loader/Loader';
import VillageForm from "./VillageForm";

class VillageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      showForm : false,
      villageToEdit  :{}
    };
  }
  componentWillMount() {
   // this.props.getStatesList();
    //this.props.getDistrictsList();
    let compRef =this;
    setTimeout(() => {
      compRef.setState({
        loading : false
      })
    },2000)
  }

  onDeleteState(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} style={{ pointerEvents: 'none' }} >
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
    //onClick={() => componentRef.deleteConfirm(row._id)}
  }

  onEditState(cell, row) {
    return (
      <Link to={this} style={{ pointerEvents: 'none' }} onClick={() => this.onEdit(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEdit(row) {
    this.setState({
      villageToEdit: row,
      showForm: true
    });
  }
  render() {
    const sortingOptions = {
      defaultSortName: "VillageName",
      defaultSortOrder: "asc",
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "All",
          value: this.props.villages.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <VillageForm {...this.props} edit={this.state.villageToEdit} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
        <div style={{marginTop : 30}}>
        <CardLayout name="Villages">
        <FormGroup row>
        <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 45 }} > 
              <Button
                type="button"
                className="theme-positive-btn"
                onClick={() => {
                  this.setState({ showForm: true });
                }}
              >
                <i className="fa fa-plus" /> &nbsp; Add village
              </Button>
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" >
            <BootstrapTable
              ref="table"
              data={this.props.villages}
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              csvFileName="VillagesList.csv"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="VillageName"
                headerAlign="left"
                width="40"
                csvHeader="Village Name"
                dataSort={true}
              >
                Village Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="GrampanchayatName"
                headerAlign="left"
                width="40"
                csvHeader="Grampanchayat"
                dataSort={true}
              >
              Grampanchayat
              </TableHeaderColumn>
              <TableHeaderColumn
              dataField="DistrictName"
              headerAlign="left"
              width="40"
              csvHeader="District"
              dataSort={true}
            >
            District 
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="StateName"
              headerAlign="left"
              width="40"
              csvHeader="State"
              dataSort={true}
            >
            State
            </TableHeaderColumn>
              <TableHeaderColumn
              dataField="edit"
              dataFormat={this.onEditState.bind(this)}
              headerAlign="left"
              width="20"
              export={false}
              >
                Edit
              </TableHeaderColumn>
              <TableHeaderColumn
              dataField="delete"
              dataFormat={this.onDeleteState.bind(this)}
              headerAlign="left"
              width="20"
              export={false}
              >
                Delete
              </TableHeaderColumn>
            </BootstrapTable>
            </Col>
          </FormGroup>
        </CardLayout>
        </div>
      )
     
  }
}
 const mapStateToProps = state => {
  return {
      villages : state.villageReducer.villages
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VillageList);
