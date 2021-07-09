import React from "react"
import { Route, Redirect } from "react-router-dom"
import useAuth from "./Authentication";



export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, authUser } = useAuth();
  return (
    <Route
    {...rest}
    render={props => {
        return currentUser ? <Component {...props} {...rest} /> : <Redirect to="/login" />  
      }}>
    </Route>
  )
}

export function AdminRoute({ component: Component, ...rest }) {
  const { currentUser, authUser, loading} = useAuth();
  console.log("authUser",authUser)
  return (
    <Route
    {...rest}
    render={props => {
        return !loading && authUser && authUser.is_admin  ? <Component {...props} {...rest} /> : <Redirect to="/login" />  
      }}>
    </Route>
  )
}

export function MemberRoute({ component: Component, ...rest }) {
  const { currentUser, authUser, loading} = useAuth();
  authUser && console.log("authUser",authUser)
  return (
    <Route
    {...rest}
    render={props => {
        return authUser && authUser.is_member ? <Component {...props} {...rest} /> : <Redirect to="/login" />  
      }}>
    </Route>
  )
}