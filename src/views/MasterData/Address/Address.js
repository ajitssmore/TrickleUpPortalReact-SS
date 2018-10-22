import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import StateList from "../StateMaster/StatesList";
import DistrictList from "../DistrictMaster/DistrictsList";
import VillageList from "../VillageMaster/VillageList";
import GrampanchayatList from "../Grampanchayat/GrampanchayatList";

const tabsList = [
  { id: "1", name: "States" },
  { id: "2", name: "Districts" },
  { id: "3", name: "Villages" },
  { id: "4", name: "Grampanchayats" }
];

export default class Address extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    let tabs = tabsList.map((tab, idx) => {
      return (
        <NavItem key={idx} style={{ border: 2 }}>
          <NavLink
            className={classnames({
              active: this.state.activeTab === tab.id
            })}
            onClick={() => {
              this.toggle(tab.id);
            }}
          >
            <div style={{ fontWeight: 599 }}>{tab.name}</div>
          </NavLink>
        </NavItem>
      );
    });
    return (
      <div className="animated fadeIn">
        <div style={{ marginLeft: -30, marginRight: -30 }}>
          <Row className="justify-content-left">
            <Col md="12">
              <Nav tabs style={{ backgroundColor: "#ED734A" }}>
                {tabs}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1" style={{height: 600}}>
                  <StateList {...this.props} />
                </TabPane>
                <TabPane tabId="2" style={{height: 600}}>
                  <DistrictList {...this.props} />
                </TabPane>
                <TabPane tabId="3" style={{height: 600}}>
                  <VillageList {...this.props} />
                </TabPane>
                <TabPane tabId="4" style={{height: 600}}>
                  <GrampanchayatList {...this.props} />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}