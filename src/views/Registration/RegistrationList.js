import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import _ from 'lodash'
class RegistrationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiaryList:[],
      loading: true,
      modalStatus: false,
      userToDelete: {}
    };
  }

  componentDidMount() {
    let compRef = this;
    this.props.getBeneficiaryList();
    setTimeout(() => {
     compRef.setBeneficiary()
    }, 2000);
  }

   setBeneficiary(){
     let compRef = this;
     let  beneficiaryList =  _.filter(compRef.props.beneficiaryList, function(beneficiary) {
     return beneficiary.Active === true && beneficiary.Role === 3;
       });
      compRef.setState({
        loading: false,
        beneficiaryList : beneficiaryList
      });
   }

  onDeleteBeneficiary(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Deactivate" />
      </Link>
    );
  }

  onDelete(row) {
    this.setState({
      userToDelete: row
    });
    this.onModalToggle();
  }

  onEditBeneficiary(cell, row) {
    return (
      <Link to={`${this.props.match.url}/registration/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

  onConfirmDelete() {
    let compRef = this;
    let user = { ...this.state.userToDelete };
    user.Active  = false;
    this.props.deleteBeneficiary(user.Id, user);
    setTimeout(() => {
     compRef.setBeneficiary()
    }, 2000);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  render() {
    const sortingOptions = {
      defaultSortName: "Name",
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
          value: this.state.beneficiaryList.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Beneficiary List">
          <FormGroup row>
            <Col xs="12" md="10" />
            <Col md="2" style={{ marginTop: -55,marginLeft :-42 }}>
              <Link to={`${this.props.match.url}/registration`}>
                <Button type="button" className="theme-positive-btn" style={{marginLeft : 50}}>
                  <i className="fa fa-plus" />
                  &nbsp; Add Beneficiary
                </Button>
              </Link>
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12" md="12">
              <BootstrapTable
                style={{ marginTop: -18 }}
                ref="table"
                data={this.state.beneficiaryList}
                pagination={true}
                search={true}
                options={sortingOptions}
                exportCSV={true}
                csvFileName="BeneficiaryList.csv"
                hover={true}
              >
                <TableHeaderColumn
                  dataField="Id"
                  headerAlign="left"
                  isKey
                  hidden
                >
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
                {/* <TableHeaderColumn
                  dataField="Aadhar"
                  csvHeader="Aadhar number"
                  export={true}
                  hidden
                /> */}
                <TableHeaderColumn
                  dataField="Active"
                  csvHeader="Active"
                  export={true}
                  hidden
                />
                <TableHeaderColumn
                  dataField="edit"
                  dataFormat={this.onEditBeneficiary.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Edit
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onDeleteBeneficiary.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Deactivate
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
          message="Are you sure you want to deactivate this beneficiary ?"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    beneficiaryList: state.beneficiaryReducer.beneficiaryList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeneficiaryList: () => dispatch(actions.getBeneficiaryList()),
    deleteBeneficiary: (id, beneficiary) =>
      dispatch(actions.deleteBeneficiary(id, beneficiary))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationList);
