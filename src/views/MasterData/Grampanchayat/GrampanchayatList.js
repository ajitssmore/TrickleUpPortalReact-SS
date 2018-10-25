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
import GrampanchayatForm from "./GrampanchayatForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

class GrampanchayatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      showForm : false,
      grampanchayatToEdit  :{},
      grampanchayatToDelete : {},
      modalStatus: false,
    };
  }
  componentWillMount() {
    this.props.getGrampanchayatsList();
    let compRef =this;
    setTimeout(() => {
      compRef.setState({
        loading : false
      })
    },2000)
  }

  onDeleteGrampanchayat(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} onClick={() => this.onDelete(row)} >
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }
  onDelete(row) {
    this.setState({
      grampanchayatToDelete: row
    });
    this.onModalToggle();
  }
  onConfirmDelete() {
    let grampanchayat = { ...this.state.grampanchayatToDelete };
    grampanchayat.Active  = false;
    this.props.deleteGrampanchayat(grampanchayat.Id, grampanchayat);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }

  onEditGrampanchayat(cell, row) {
    return (
      <Link to={this} onClick={() => this.onEdit(row)} >
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEdit(row) {
    this.setState({
      grampanchayatToEdit: row,
      showForm: true
    });
  }
  render() {
    const sortingOptions = {
      defaultSortName: "GrampanchayatName",
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
          value: this.props.grampanchayats.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <GrampanchayatForm {...this.props} edit={this.state.grampanchayatToEdit} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
        <div style={{marginTop : 30}}>
        <CardLayout name="Grampanchayats">
        <FormGroup row>
        <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: -20 }} >              {/* <Link to={`${this.props.match.url}/stateForm`}> */}
              <Button
                type="button"
                className="theme-positive-btn"
                
                onClick={() => {
                  this.setState({ showForm: true });
                }}
              >
                <i className="fa fa-plus" /> &nbsp; Add grampanchayat
              </Button>
              {/* </Link> */}
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" >
            <BootstrapTable
              ref="table"
              data={this.props.grampanchayats}
              pagination={true}
              search={true}
              options={sortingOptions}
              hover={true}
              csvFileName="grampanchayatList.csv"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="GrampanchayatName"
                headerAlign="left"
                width="40"
                dataSort={true}
              >
              Grampanchayat
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="DistrictName"
                headerAlign="left"
                width="40"
                dataSort={true}
              >
                District 
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="StateName"
                headerAlign="left"
                width="40"
                dataSort={true}
              >
                State
              </TableHeaderColumn>
              <TableHeaderColumn
              dataField="edit"
              dataFormat={this.onEditGrampanchayat.bind(this)}
              headerAlign="left"
              width="20"
              export={false}
              >
                Edit
              </TableHeaderColumn>
              <TableHeaderColumn
              dataField="delete"
              dataFormat={this.onDeleteGrampanchayat.bind(this)}
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
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title="Deactivate"
          message="Are you sure you want to deactivate this state record ?"
        />
        </div>
      )
     
  }
}
 const mapStateToProps = state => {
  return {
      grampanchayats : state.grampanchayatReducer.grampanchayats
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    getStatesList: () => dispatch(actions.getStatesList()),
    getDistrictsList: () => dispatch(actions.getDistrictsList()),
    getGrampanchayatsList : () => dispatch(actions.getGrampanchayatsList()),
    deleteGrampanchayat : (id,grampanchayat) => dispatch(actions.deleteGrampanchayat(id, grampanchayat))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GrampanchayatList);
