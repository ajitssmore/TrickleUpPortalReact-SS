import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import InputElement from "../../components/InputElement/InputElement";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Loader from "../../components/Loader/Loader";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
import AppConfig from "../../constants/AppConfig";


const grampanchayatList = [
  { label: "grampanchayat1", value: 1 },
  { label: "grampanchayat2", value: 2 },
  { label: "grampanchayat3", value: 3 }
];
const villageList = [
  { label: "village1", value: 1 },
  { label: "village2", value: 2 },
  { label: "village3", value: 3 }
];

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {
        Id : "",
        UserId: null,
        Active : true,
        Name: "",
        NameRequired: false,
        PhoneNumber: "", //no
        PhoneNumberRequired: false,
        PhoneNumberInvalid: false,
        Age: "", //no
        AgeRequired: false,
        Gender: "", //id //no
        State: "", //id //no
        District: "", //id
        Village: "", //id
        Grampanchayat: "", //id
        Aadhaar: "",
        IMEI1: null,
        IMEI2: null,
        Role: "", //id
        Language: "",
        FCMToken: "",
        CreatedBy: "", //logged in user userid
        CreatedOn: "",
        UpdatedBy: "",
        UpdatedOn: "",
        ActiveBy :"",
        ActiveOn :"",
        ImagePath :"",
        BulkUploadId: ""
      },
      genderRequired: false,
      stateRequired: false,
      districtRequired: false,
      grampanchayatRequired: false,
      villageRequired: false,
      roleRequired: false,
      languageRequired: false,
      updateFlag: false
    };
  }
 
  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    if (this.props.match.params.id !== undefined) {
      let id = this.props.match.params.id
      this.props.getBeneficiaryById(id);
      setTimeout(() => {
          if(this.props.currentBeneficiary){
            this.setState({
              user : this.props.currentBeneficiary,
              updateFlag: true
            })
          }
      },1000)
    }
  }
  onChangeInput(event) {
    let user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    user[event.target.name + "Required"] = false;
    user[event.target.name + "Invalid"] = false;
    this.setState({
      user: user
    });
  }
  onGenderSelection(value) {
    let user = { ...this.state.user };
    user.Gender = value;
    this.setState({
      user: user,
      genderRequired: false
    });
  }
  onStateSelection(value) {
    let user = { ...this.state.user };
    user.State = value;
    this.setState({
      user: user,
      stateRequired: false
    });
  }
  onDistrictSelection(value) {
    let user = { ...this.state.user };
    user.District = value;
    this.setState({
      user: user,
      districtRequired: false
    });
  }
  onVillageSelection(value) {
    let user = { ...this.state.user };
    user.Village = value;
    this.setState({
      user: user,
      villageRequired: false
    });
  }
  onGrampanchayatSelection(value) {
    let user = { ...this.state.user };
    user.Grampanchayat = value;
    this.setState({
      user: user,
      grampanchayatRequired: false
    });
  }
  onRoleSelection(value) {
    let user = { ...this.state.user };
    user.Role = value;
    this.setState({
      user: user,
      roleRequired: false
    });
  }
  onLanguageSelection(value) {
    let user = { ...this.state.user };
    user.Language = value;
    this.setState({
      user: user,
      languageRequired: false
    });
  }
  onSubmit() {
    let user = { ...this.state.user };
    let compRef = this;
    if (this.validData()) {
      if (this.state.updateFlag) {
        user = _.pick(user, [
          "Id",
          "Active",
          "UserId",
          "Name",
          "PhoneNumber",
          "Age",
          "Gender",
          "State",
          "District",
          "Village",
          "Grampanchayat",
          "Aadhaar",
          "IMEI1",
          "IMEI2",
          "Role",
          "Language",
          "FCMToken",
          "CreatedBy",
          "CreatedOn",
          "UpdatedBy",
          "UpdatedOn",
          "ActiveBy" ,
          "ActiveOn",
          "ImagePath",
          "BulkUploadId"
        ]);
        user.UpdatedBy = 1;
        user.UpdatedOn = new Date();
        this.props.updateBeneficiary(user.Id, user);
        this.setState({ loading: true });
        setTimeout(() => {
          let message = "";
          compRef.props.beneficiaryError
            ? (message = "Something went wrong !")
            : (message = "Beneficiary updated successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.beneficiaryError);
          setTimeout(() => {
            if (!compRef.props.beneficiaryError) {
              compRef.onReset();
              compRef.props.history.push("/beneficiary/beneficiaryList");
            }
          }, 1000);
        }, 1000);
      } else {
        user = _.pick(user, [
          "Active",
          "UserId",
          "Name",
          "PhoneNumber",
          "Age",
          "Gender",
          "State",
          "District",
          "Village",
          "Grampanchayat",
          "Aadhaar",
          "IMEI1",
          "IMEI2",
          "Role",
          "Language",
          "FCMToken",
          "CreatedBy",
          "CreatedOn",
          "UpdatedBy",
          "UpdatedOn",
          "ActiveBy" ,
          "ActiveOn",
          "ImagePath",
          "BulkUploadId"
        ]);
        user.CreatedBy = 1;
        user.CreatedOn = new Date();
        this.props.createBeneficiary(user);
        this.setState({loading: true});
        setTimeout(() => {
          let message = "";
          compRef.props.beneficiaryError
            ? (message = "Something went wrong !")
            : (message = "Beneficiary created successfully");
          compRef.setState({ loading: false });
          Toaster.Toaster(message, compRef.props.beneficiaryError);
          setTimeout(() => {
            if (!compRef.props.beneficiaryError) {
              compRef.onReset();
              compRef.props.history.push("/beneficiary/beneficiaryList");
            }
          }, 1000);
        }, 1000);
      }
    } else {
      this.showValidations(user);
    }
  }

  validData() {
    let user = { ...this.state.user };
    if (
      user.Name &&
      user.PhoneNumber &&
      user.PhoneNumber.length === 10 &&
      user.Age &&
      user.Gender &&
      user.State &&
      user.District &&
      user.Village &&
      user.Grampanchayat &&
      user.Role &&
      user.Language
    ) {
      return true;
    } else {
      return false;
    }
  }
  showValidations(user) {
    !user.Name ? (user.NameRequired = true) : null;
    user.PhoneNumber && user.PhoneNumber.length !== 10
      ? (user.PhoneNumberInvalid = true)
      : null;
    !user.PhoneNumber
      ? ((user.PhoneNumberRequired = true), (user.PhoneNumberInvalid = false))
      : null;
    !user.Age ? (user.AgeRequired = true) : null;
    !user.Gender ? this.setState({ genderRequired: true }) : null;
    !user.State ? this.setState({ stateRequired: true }) : null;
    !user.District ? this.setState({ districtRequired: true }) : null;
    !user.Village ? this.setState({ villageRequired: true }) : null;
    !user.Grampanchayat ? this.setState({ grampanchayatRequired: true }) : null;
    !user.Role ? this.setState({ roleRequired: true }) : null;
    !user.Language ? this.setState({ languageRequired: true }) : null;
    this.setState({
      user: user
    });
  }
  onReset() {
    let userObj = {
      ...this.state.user,
      Name: "",
      NameRequired: false,
      PhoneNumber: "", //no
      PhoneNumberRequired: false,
      PhoneNumberInvalid: false,
      Age: "", //no
      AgeRequired: false,
      Gender: "", //id
      State: "", //id
      District: "", //id
      Village: "", //id
      Grampanchayat: "", //id
      Aadhaar: "",
      Role: "",
      Language: ""
    };
    this.setState({
      user: userObj,
      genderRequired: false,
      stateRequired: false,
      districtRequired: false,
      grampanchayatRequired: false,
      villageRequired: false,
      roleRequired: false,
      languageRequired: false
    });
  }
  render() {
    let user = { ...this.state.user };
    return this.state.loading ? <Loader loading={this.state.loading} /> : <div style={{ marginTop: 30 }}>
        <CardLayout name="Beneficiary Form" navigation={true} navigationRoute="/beneficiary/beneficiaryList">
          <FormGroup row />
          <div style={{ margin: 20 }}>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement type="text" label="Name" name="Name" placeholder="Please enter name " value={user.Name} required={user.NameRequired} onChange={event => this.onChangeInput(event)} />
              </Col>
              <Col md="5">
                <InputElement type="text" label="Phone number" name="PhoneNumber" maxLength={10} placeholder="Please enter phone number " value={user.PhoneNumber} required={user.PhoneNumberRequired} invalid={user.PhoneNumberInvalid} onChange={event => this.onChangeInput(event)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement type="number" label="Age" name="Age" maxLength={3} placeholder="Please enter age " value={user.Age} required={user.AgeRequired} onChange={event => this.onChangeInput(event)} />
              </Col>
              <Col md="5">
                <Label>Gender</Label>
                <DropdownSelect id="1" name="Gender" placeholder="Select gender " options={this.props.gendersList} value={user.Gender} required={this.state.genderRequired} onChange={this.onGenderSelection.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>State</Label>
                <DropdownSelect name="State" placeholder="Select state" options={this.props.statesList} value={user.State} required={this.state.stateRequired} onChange={this.onStateSelection.bind(this)} />
              </Col>
              <Col md="5">
                <Label>District</Label>
                <DropdownSelect name="District" placeholder="Select district " options={this.props.districtsList} value={user.District} required={this.state.districtRequired} onChange={this.onDistrictSelection.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>Grampanchayat</Label>
                <DropdownSelect name="Grampanchayat" placeholder="Select grampanchayat " value={user.Grampanchayat} options={grampanchayatList} required={this.state.grampanchayatRequired} onChange={this.onGrampanchayatSelection.bind(this)} />
              </Col>
              <Col md="5">
                <Label>Village</Label>
                <DropdownSelect name="Village" placeholder="Select village " value={user.Village} options={villageList} required={this.state.villageRequired} onChange={this.onVillageSelection.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <InputElement type="text" label="Aadhaar number" name="Aadhaar" placeholder="Please enter aadhaar number " value={user.Aadhaar} onChange={event => this.onChangeInput(event)} />
              </Col>
              <Col md="5">
                <Label>Role</Label>
                <DropdownSelect name="Role" placeholder="Select role " options={this.props.rolesList} value={user.Role} required={this.state.roleRequired} onChange={this.onRoleSelection.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" md="5">
                <Label>Language</Label>
                <DropdownSelect name="Language" placeholder="Select language " options={this.props.languagesList} value={user.Language} required={this.state.languageRequired} onChange={this.onLanguageSelection.bind(this)} />
              </Col>
              <Col md="5">
                {this.state.user.ImagePath ? <div>
                    
                      <Label> Profile Image :</Label>
                   
                      <img src={`${AppConfig.serverURL}/${this.state.user.ImagePath}`} style={{ height: 90, width: 100,marginLeft :20 }} alt="" />{" "}
              
                  </div> : null}
              </Col>
            </FormGroup>
            <FormGroup row>
              {this.state.updateFlag ? <Col md="1">
                  <Button className="theme-positive-btn" onClick={this.onSubmit.bind(this)}>
                    Edit
                  </Button>
                </Col> : <Col md="1">
                  <Button className="theme-positive-btn" onClick={this.onSubmit.bind(this)}>
                    Submit
                  </Button>
                </Col>}

              <Col md="1">
                <Button className="theme-reset-btn" onClick={this.onReset.bind(this)}>
                  Reset
                </Button>
              </Col>
            </FormGroup>
          </div>
        </CardLayout>
        <ToastContainer autoClose={2000} />
      </div>;
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    districtsList: state.districtReducer.districtsList,
    beneficiaryList: state.beneficiaryReducer.beneficiaryList,
    rolesList: state.rolesReducer.rolesList,
    gendersList: state.rolesReducer.gendersList,
    languagesList: state.rolesReducer.languagesList,
    beneficiaryError: state.beneficiaryReducer.beneficiaryError,
    currentBeneficiary : state.beneficiaryReducer.currentBeneficiary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeneficiaryList: () => dispatch(actions.getBeneficiaryList()),
    createBeneficiary: beneficiary =>
      dispatch(actions.createBeneficiary(beneficiary)),
    updateBeneficiary: (id, beneficiary) =>
      dispatch(actions.updateBeneficiary(id, beneficiary)),
      getBeneficiaryById : (id) => dispatch(actions.getBeneficiaryById(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
