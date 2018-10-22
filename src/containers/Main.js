import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../_nav";
import routes from "../routes";
import DefaultAside from "../components/DefaultAside";
import DefaultFooter from "../components/DefaultFooter";
import DefaultHeader from "../components/DefaultHeader";
import Login from "../views/Authentication/Login";

let routeStack;
class Main extends Component {
  componentDidMount(){
    this.props.getStatesList();
    this.props.getDistrictsList();
    this.props.getBeneficiaryList();
    this.props.getCropsList();
    this.props.getRolesList();
    this.props.getGendersList();
    this.props.getLanguageList();
  }
  render() {
    let user = localStorage.getItem("user");
    if (user) {
      routeStack = (
        <div className="app">
          <AppHeader fixed>
            <DefaultHeader {...this.props} />
          </AppHeader>
          <div className="app-body" >
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <AppSidebarNav navConfig={navigation} {...this.props} />
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
              <Container fluid>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
            </main>
            <AppAside fixed hidden>
              <DefaultAside />
            </AppAside>
          </div>
          <AppFooter>
            <DefaultFooter />
          </AppFooter>
        </div>
      );
    } else {
      routeStack = (
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/login" />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <div>{routeStack}</div>;
  }
}
const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatesList : () => dispatch(actions.getStatesList()),
    getDistrictsList : () => dispatch(actions.getDistrictsList()),
    getBeneficiaryList : () => dispatch(actions.getBeneficiaryList()),
    getCropsList : () => dispatch(actions.getCropsList()),
    getRolesList : () => dispatch(actions.getRolesList()),
    getGendersList : () => dispatch(actions.getGendersList()),
    getLanguageList : () => dispatch(actions.getLanguageList()),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Main);
