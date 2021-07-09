import React from 'react'
import AppDrawer from './components/Modules/appBar'

export default function Layout({ children }) {
  return (
    <div>
    <AppDrawer />
    {children}
    </div>
  )
}
