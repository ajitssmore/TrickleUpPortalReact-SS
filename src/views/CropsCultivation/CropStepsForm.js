import React, { Component } from "react";
import { connect } from "react-redux";
import CardLayout from "../../components/Cards/CardLayout";
import { FormGroup, Col, Button } from "reactstrap";
import InputElement from "../../components/InputElement/InputElement";
import AppConfig from "../../constants/AppConfig";
import Loader from "../../components/Loader/Loader";
import * as actions from "../../store/actions";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import _ from "lodash";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class CropStepsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      cropNameDisabled: false,
      cropStep: {
        CropName: "",
        MediaURL: "",
        Step_Name: "",
        Step_Description: "",
        CropNameRequired: false,
        Step_DescriptionRequired: false,
        renderURL: ""
      },
      cropStepAudioAllocation: [],
      loading: true
    };
  }
  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      if (this.props.cropSteps.length !== 0) {
        let id = this.props.match.params.id;
        this.props.getCropStepsAudioAllocation(id);
        let currentCropStep = _.find(this.props.cropSteps, function(cropStep) {
          return cropStep.Id == id;
        });
        currentCropStep.renderURL = `${AppConfig.serverURL}/${currentCropStep.MediaURL}`;
        setTimeout(() => {
          this.setState({
            updateFlag: true,
            cropStep: currentCropStep,
            loading: false,
            cropNameDisabled: true,
            cropStepAudioAllocation: this.props.cropStepAudioAllocation
          });
        }, 1000);
      }
    } else {
      this.setState({
        loading: false
      });
    }
    if (this.props.cropStepError) {
      Toaster.Toaster("Something went wrong !", this.props.cropStepError);
    }
  }
  onChangeName(event) {
    let cropStep = { ...this.state.cropStep };
    cropStep[event.target.name] = event.target.value;
    cropStep[event.target.name + "Required"] = false;
    this.setState({
      cropStep: cropStep
    });
  }
  onImageChange(event) {
    if (event.target.files.length !== 0) {
      let file = event.target.files[0];
      let cropStep = { ...this.state.cropStep };
      let data = new FormData();
      data.append("FileName", file.name);
      data.append("FileSize", file.size);
      data.append("MediaType", file.type);
      cropStep.FilePath = data;
      cropStep.CropImageRequired = false;
      cropStep.renderURL = URL.createObjectURL(event.target.files[0]);
      this.setState({
        cropStep: cropStep
      });
    } else {
      let cropStep = { ...this.state.cropStep };
      cropStep.FilePath = "";
      cropStep.renderURL = "";
      this.setState({ cropStep: cropStep });
    }
  }
  onSwitch(event) {
    let cropStep = { ...this.state.cropStep };
    cropStep.Ready = event.target.checked;
    cropStep.Ready
      ? this.setState({
          cropStep: cropStep,
          cropStatus: "Active"
        })
      : this.setState({
          cropStep: cropStep,
          cropStatus: "Inactive"
        });
  }
  onSubmit() {
    this.props.history.push("/cropCultivations/CropSteps");
  }
  playAudio(cell, row) {
    return <AudioPlayer autoPlay={false} source={row.FilePath} />;
  }
  render() {
    let cropStep = { ...this.state.cropStep };
    const sortingOptions = {
      defaultSortName: "FieldType",
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
          value: this.props.cropStepAudioAllocation.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Crop Step Form"
        navigation={true}
        navigationRoute="/cropCultivations/CropSteps"
      >
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12" md="6">
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="text"
                    name="CropName"
                    label="Crop name "
                    disabled={true}
                    placeholder="Crop name"
                    value={cropStep.CropName}
                    required={cropStep.CropNameRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="text"
                    name="Step_Name"
                    label="Step Name"
                    placeholder="Step Name"
                    value={cropStep.Step_Name}
                    disabled={true}
                    required={cropStep.Step_NameRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="textarea"
                    name="Step_Description"
                    label="Step Description"
                    placeholder="Step_Description"
                    value={cropStep.Step_Description}
                    disabled={true}
                    //required={cropStep.CropNameRequired}
                    onChange={event => this.onChangeName(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="10" md="8">
                  <InputElement
                    type="file"
                    name="MediaURL"
                    label="Upload media"
                    disabled={true}
                    //placeholder="MediaURL"
                    //value={cropStep.Step_Description}
                    //required={cropStep.CropNameRequired}
                    onChange={event => this.onImageChange(event)}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              {/* {this.state.cropStep.renderURL !== "" ? ( */}
              <img
                src={this.state.cropStep.renderURL}
                height={300}
                width={350}
                alt=""
              />
              {/* ) : null} */}
            </Col>
          </FormGroup>
        </div>
        {this.props.cropStepAudioAllocation.length > 0 ? (
          <div style={{ marginTop: -50 }}>
            <CardLayout
              subName="Audio Allocation"
              buttonName="Add Audio"
              buttonLink={this}
              active="none"
            >
              <FormGroup row>
                <Col xs="12" style={{ marginTop: -10 }}>
                  <BootstrapTable
                    ref="table"
                    data={this.props.cropStepAudioAllocation}
                    pagination={true}
                    search={true}
                    options={sortingOptions}
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
                      dataField="FieldType"
                      headerAlign="left"
                      width="15"
                      dataSort={true}
                    >
                      Field Type
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="LanguageName"
                      headerAlign="left"
                      width="30"
                      dataSort={true}
                    >
                      Language
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="FileName"
                      headerAlign="left"
                      width="30"
                      dataSort={true}
                    >
                      File Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="Audio"
                      headerAlign="left"
                      width="60"
                      dataFormat={this.playAudio.bind(this)}
                    >
                      Audio
                    </TableHeaderColumn>
                  </BootstrapTable>
                </Col>
              </FormGroup>
            </CardLayout>
          </div>
        ) : null}
        {this.state.updateFlag ? (
          <FormGroup row>
            <Col md="1">
              <Button
                className="theme-positive-btn"
                onClick={() => this.onSubmit()}
                style={{ pointerEvents: "none", opacity: 0.5 }}
              >
                Save
              </Button>
            </Col>
          </FormGroup>
        ) : (
          <FormGroup row>
            <Col md="2">
              <Button
                className="theme-positive-btn"
                onClick={() => this.onSubmit()}
                style={{ pointerEvents: "none", opacity: 0.5 }}
              >
                Create
              </Button>
            </Col>
            <Col md="1">
              <Button
                className="theme-reset-btn"
                style={{ pointerEvents: "none", opacity: 0.5 }}
              >
                {" "}
                Reset
              </Button>
            </Col>
          </FormGroup>
        )}
        <ToastContainer autoClose={2000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    cropSteps: state.cropsReducer.cropSteps,
    cropStepAudioAllocation: state.cropsReducer.currentCropStepAudioAllocation,
    cropStepError: state.cropsReducer.cropStepError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropStepsAudioAllocation: id =>
      dispatch(actions.getCropStepsAudioAllocation(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropStepsForm);
