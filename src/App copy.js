import React, { useContext, useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import { AuthProvider } from './components/authentication/Authentication';
import PrivateRoute, { AdminRoute, MemberRoute } from './components/authentication/PrivateRoute'
import FinishRegistration from './components/FinishRegistration';
// import AdminRoute from './components/authentication/Permissions';
import CreatePost from './components/Modules/AdminModules/CreatePost';
import CreateAnnouncements from './components/Modules/AdminModules/CreateAnnouncement';
import RentInfo from './components/Modules/rentInfo';
import CreatePaymentInfo from './components/Modules/AdminModules/CreatePaymentInfo';

export default function App() {
  return (
    <Router>
      <AuthProvider>
          <Switch>
            {/* <PrivateRoute exact path="/" component={HomePage}/> */}
            {/* MEMBERS */}
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute path="/finishregistration" component={FinishRegistration} />
            <PrivateRoute path="/rent/info" component={RentInfo} />
            {/* ADMINS */}
            <PrivateRoute path="/post/new" component={CreatePost} />
            <PrivateRoute path="/notification/new" component={CreateAnnouncements} />
            <PrivateRoute path="/payment/new" component={CreatePaymentInfo} />
            {/* ANONYMOUS */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
          </Switch>
      </AuthProvider>
    </Router>
  );
}


