import React from "react"
import { Route, Redirect } from "react-router-dom"
import useAuth from "./Authentication";


export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser, authUser } = useAuth();
  console.log("authUser",authUser)
  return (
    <Route
    {...rest}
    render={props => {
        return currentUser ? <Component {...props} {...rest} /> : <Redirect to="/register" />  
      }}>
    </Route>
  )
}

export function MemberRoute({ component: Component, ...rest }) {
  const { authUser } = useAuth();
  // console.log("####user permission", authUser && authUser.is_member)
  if (authUser) {
    return (
      <Route
        {...rest}
        render={props => {
          return authUser.is_memeber ? <Component {...props} /> : <Redirect to="/register" />
        }}>
      </Route>
    )
  }else{
    return <Redirect to="/register" />
  }
}