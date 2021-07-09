import React, { useState, useEffect, Fragment, useRef } from 'react'
import { Route, Redirect } from "react-router-dom"
import HomePage from './HomePage';

import AppDrawer from './AppBar'
import LoadingScreen from './authentication/LoadingScreen';
import useAuth from './authentication/Authentication';



import { CssBaseline } from '@material-ui/core';



export default function Main() {
  const { waiting, loading, currentUser, authUser } = useAuth();
  const notiFyRef = useRef(null)
  return (
      <Fragment>
        <CssBaseline />
        <AppDrawer notiFyRef={notiFyRef}/>
        <HomePage notiFyRef={notiFyRef}/>
      </Fragment>
  );
}
