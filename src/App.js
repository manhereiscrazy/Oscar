import React, { useContext, useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Main from './components/Main';
import { AuthProvider } from './components/authentication/Authentication';
import { DataProvider } from './components/authentication/DataProcess/DataFetch';
import PrivateRoute, { AdminRoute, MemberRoute } from './components/authentication/PrivateRoute'
// import AdminRoute from './components/authentication/Permissions';
import CreatePost from './components/Modules/AdminModules/CreatePost';
import CreateNotification from './components/Modules/AdminModules/CreateNotification';
import RentInfo from './components/Modules/rentInfo';
import CreatePaymentInfo from './components/Modules/AdminModules/CreatePaymentInfo';
import Login from "./components/authentication/Authentication/Login";
import Logout from "./components/authentication/Authentication/Logout";
import Register from "./components/authentication/Authentication/Register";
import CompleteRegistration from "./components/authentication/Authentication/CompleteRegistration";
import Profile from './components/MainJS/Profile/Profile'






export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Switch>
            {/* <PrivateRoute exact path="/" component={HomePage}/> */}
            {/* MEMBERS */}
            <PrivateRoute exact path="/" component={Main} />
            <Route render={()=><Redirect to="/" />} />
            <PrivateRoute path="/rent/info" component={RentInfo} />
            {/* ADMINS */}
            <PrivateRoute path="/post/new" component={CreatePost} />
            <PrivateRoute path="/notification/new" component={CreateNotification} />
            <PrivateRoute path="/payment/new" component={CreatePaymentInfo} />
            <PrivateRoute path="/profile/edit" component={Profile} />
            {/* ANONYMOUS */}
          </Switch>
        </DataProvider>
        <Switch>
          <PrivateRoute path="/finishregistration" component={CompleteRegistration} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}


