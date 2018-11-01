import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import * as constants from "../../../constants/StatusConstants";


class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      loading: true,
      modalStatus: false,
      roleToDelete: {},
      tableStatus : true
    };
  }

  componentWillMount() {
    this.props.getRolesList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }

  onDeleteState(cell, row) {
    let componentRef = this;
    if(this.state.tableStatus){
      return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Dactivate" />
      </Link>
    );
    }
   else{
       return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
      </Link>
    );
   }
  }

  onTablestatusChange(value) {
    if(value!=null){
       this.setState({
      tableStatus: value
    }); 
  }
  }

  onDelete(row) {
    this.setState({
      roleToDelete: row
    });
    this.onModalToggle();
  }

 
  onConfirmDelete() {
    let compRef = this;
    let role = { ...this.state.roleToDelete };
    if(this.state.tableStatus){
     role.Active = false;
     this.props.deleteRole(role.Id, role);
    }
    else{
     role.Active = true;
     this.props.deleteRole(role.Id, role);
    }
    //this.setState({ loading: true });
    setTimeout(() => {
      let message = "";
      let displayMessage = compRef.state.tableStatus ? "Role deactivated successfully": "Role activated successfully"
      compRef.props.roleMasterError
        ? (message = "Something went wrong !")
        : (message = displayMessage);
      //compRef.setState({ loading: false });
      Toaster.Toaster(message, compRef.props.roleMasterError);
    }, 1000);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }

  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }

  onEditState(cell, row) {
    let componentRef = this;
    return (
      <Link to={`${componentRef.props.match.url}/RoleForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

  render() {
    const sortingOptions = {
      defaultSortName: "RoleName",
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
          value: this.state.tableStatus ? this.props.Roles.length : this.props.inactiveRoles.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Roles"
        buttonName="Add Role"
        buttonLink={`${this.props.match.url}/RoleForm`}
      >
      <br/>
       <FormGroup row>
            <Col xs="12" md="4">
              <DropdownSelect
                name="tableStatus"
                value = {this.state.tableStatus}
                options={constants.tableStatus}
               onChange={this.onTablestatusChange.bind(this)}
              />
            </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12">
            <BootstrapTable
              ref="table"
              data={this.state.tableStatus ? this.props.Roles : this.props.inactiveRoles}
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              csvFileName="Roles List"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="RoleName"
                headerAlign="left"
                width="30"
                csvHeader="Role Name"
                dataSort={true}
              >
                Role Name
              </TableHeaderColumn>
              {
              this.state.tableStatus ?     
              <TableHeaderColumn
                dataField="edit"
                dataFormat={this.onEditState.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
                Edit
              </TableHeaderColumn>  : null
              }
             {
              this.state.tableStatus ?  <TableHeaderColumn
                dataField="delete"
                dataFormat={this.onDeleteState.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
              Deactivate
              </TableHeaderColumn> :  <TableHeaderColumn
                dataField="delete"
                dataFormat={this.onDeleteState.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
                Activate
              </TableHeaderColumn>
            }
            </BootstrapTable>
          </Col>
          <ToastContainer autoClose={2000} />
        </FormGroup>
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title= {this.state.tableStatus ? "Deactivate" : "Acivate"}
          message={this.state.tableStatus ? "Are you sure you want to deactivate this role record ?" : 
                  "Are you sure you want to activate this role record ?"}
        />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    Roles: state.rolesReducer.roles,
    roleMasterError: state.rolesReducer.roleMasterError,
    inactiveRoles : state.rolesReducer.inactiveRoles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRolesList: () => dispatch(actions.getRolesList()),
    deleteRole: (id, state) => dispatch(actions.deleteRole(id, state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RolesList);
