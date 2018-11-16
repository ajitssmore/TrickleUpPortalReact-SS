import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
import GrampanchayatList from "./GrampanchayatList";
import _ from "lodash";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
import Loader from "../../../components/Loader/Loader";

class GrampanchayatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grampanchayat: {
        GrampanchayatName: "",
        District: "",
        State: "",
        CreatedOn: "",
        CreatedBy: "",
        UpdatedOn: "",
        UpdatedBy: "",
        Active: true,
        GrampanchayatNameRequired: false,
        DistrictRequired: false,
        StateRequired: false
      },
      showList: false,
      grampanchayatToEdit: this.props.edit,
      updateFlag: false,
      districtOptions: this.props.districtsList,
      districtDisabled: true
    };
  }
  componentDidMount() {
    if (Object.keys(this.state.grampanchayatToEdit).length !== 0) {
      let compRef = this;
      let districtOptions = _.filter(this.props.districtsList, function(
        district
      ) {
        return district.stateId === compRef.state.grampanchayatToEdit.State;
      });
      this.setState({
        updateFlag: true,
        districtOptions: districtOptions,
        grampanchayat: this.state.grampanchayatToEdit,
        districtDisabled: false
      });
    }
  }
  onChangeHandler(event) {
    let grampanchayat = { ...this.state.grampanchayat };
    grampanchayat[event.target.name] = event.target.value;
    grampanchayat[event.target.name + "Required"] = false;
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  onStateValueChange(value) {
    let grampanchayat = { ...this.state.grampanchayat };
    grampanchayat.State = value;
    grampanchayat.District = "";
    grampanchayat.StateRequired = false;
    let districtOptions = _.filter(this.props.districtsList, function(
      district
    ) {
      return district.stateId === value;
    });
    this.setState({
      grampanchayat: grampanchayat,
      districtOptions: districtOptions,
      districtDisabled: false
    });
  }
  onDistrictValueChange(value) {
    let grampanchayat = { ...this.state.grampanchayat };
    grampanchayat.District = value;
    grampanchayat.DistrictRequired = false;
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  onSubmit() {
    let compRef = this;
    let grampanchayat = { ...this.state.grampanchayat };
    if (this.valid(grampanchayat)) {
      let grampanchayatUpdate = _.pick(grampanchayat, [
        "Id",
        "GrampanchayatName",
        "District",
        "State",
        "UpdatedOn",
        "UpdatedBy",
        "Active"
      ]);
      grampanchayatUpdate.UpdatedBy = localStorage.getItem("user");
      grampanchayatUpdate.UpdatedOn = new Date();
      grampanchayatUpdate.Active = true;
      let grampanchayatCreate = _.pick(this.state.grampanchayat, [
        "GrampanchayatName",
        "District",
        "State",
        "CreatedOn",
        "CreatedBy",
        "Active"
      ]);
      grampanchayatCreate.CreatedBy = localStorage.getItem("user");
      grampanchayatCreate.CreatedOn = new Date();
      grampanchayatCreate.Active = true;
      this.state.updateFlag
        ? this.props.updateGrampanchayat(
            grampanchayatUpdate.Id,
            grampanchayatUpdate
          )
        : this.props.createGrampanchayat(grampanchayatCreate);
      //this.setState({ loading: true });
      setTimeout(() => {
        let message = "";
       
        compRef.props.grampanchayatMasterError
          ? (message = "Something went wrong !")
          : compRef.state.updateFlag
            ? (message = "Grampanchayat updated successfully")
            : (message = "Grampanchayat created successfully");
            compRef.onReset();
       // compRef.setState({ loading: false });
        Toaster.Toaster(message, compRef.props.grampanchayatMasterError);
        setTimeout(() => {
          if (!compRef.props.grampanchayatMasterError) {
            compRef.onReset();
            compRef.setState({ showList: true });
          }
        }, 1000);
      }, 1000);
    }
  }
  valid(grampanchayat) {
    if (
      grampanchayat.GrampanchayatName &&
      grampanchayat.GrampanchayatName.trim().length > 0 &&
      grampanchayat.District &&
      grampanchayat.State
    ) {
      return true;
    } else {
      if (
        !grampanchayat.GrampanchayatName ||
        grampanchayat.GrampanchayatName.trim().length === 0
      )
        grampanchayat.GrampanchayatNameRequired = true;

      if (!grampanchayat.District) grampanchayat.DistrictRequired = true;
      if (!grampanchayat.State) grampanchayat.StateRequired = true;

      this.setState({
        grampanchayat: grampanchayat
      });
      return false;
    }
  }
  onReset() {
    let grampanchayat = {
      GrampanchayatName: "",
      District: "",
      State: "",
      CreatedOn: "",
      CreatedBy: "",
      UpdatedOn: "",
      UpdatedBy: "",
      Active: true,
      GrampanchayatNameRequired: false,
      DistrictRequired: false,
      StateRequired: false
    };
    this.setState({
      grampanchayat: grampanchayat
    });
  }
  render() {
    let grampanchayat = { ...this.state.grampanchayat };
    return this.state.showList ? (
      <GrampanchayatList {...this.props} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div className="address-tabs-margin">
        <CardLayout
          name="Grampanchayat Form"
          navigation={true}
          navigationRoute={this}
          onClick={() => {
            this.setState({ showList: true });
          }}
        >
          <div className="div-padding">
            <FormGroup row />
            <FormGroup row>
              <Col xs="10" md="5">
                <Label>State</Label>
                <DropdownSelect
                  name="States"
                  placeholder="Select State..."
                  options={this.props.statesList}
                  value={grampanchayat.State}
                  required={grampanchayat.StateRequired}
                  onChange={this.onStateValueChange.bind(this)}
                  search={true}
                  simpleValue
                />
              </Col>
              <Col md="5">
                <Label>District</Label>
                <DropdownSelect
                  name="District"
                  placeholder="Select district..."
                  options={this.state.districtOptions}
                  value={grampanchayat.District}
                  required={grampanchayat.DistrictRequired}
                  disabled={this.state.districtDisabled}
                  onChange={this.onDistrictValueChange.bind(this)}
                  search={true}
                  simpleValue
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="10" md="5">
                <InputElement
                  type="text"
                  label="Grampanchayat"
                  name="GrampanchayatName"
                  maxLength={255}
                  placeholder="Grampanchayat name"
                  value={grampanchayat.GrampanchayatName}
                  required={grampanchayat.GrampanchayatNameRequired}
                  onChange={event => this.onChangeHandler(event)}
                />
              </Col>
              <Col md="5" />
            </FormGroup>

            {this.state.updateFlag ? (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Save
                  </Button>
                </Col>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Col md="1">
                  <Button
                    className="theme-positive-btn"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Create
                  </Button>
                </Col>
                <Col md="1">
                  <Button
                    className="theme-reset-btn"
                    onClick={this.onReset.bind(this)}
                  >
                    Reset
                  </Button>
                </Col>
              </FormGroup>
            )}
          </div>
          <ToastContainer autoClose={1000} />
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    statesData: state.stateReducer.states,
    districtsList: state.districtReducer.districtsList,
    grampanchayatMasterError:
      state.grampanchayatReducer.grampanchayatMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGrampanchayat: grampanchayat =>
      dispatch(actions.createGrampanchayat(grampanchayat)),
    updateGrampanchayat: (id, grampanchayat) =>
      dispatch(actions.updateGrampanchayat(id, grampanchayat))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GrampanchayatForm);
