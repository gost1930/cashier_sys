import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function NotRequiredAuth() {
    const token = localStorage.getItem('token')
  return (
    token? <Navigate to="/purchase" /> : <Outlet />
  )
}

export default NotRequiredAuth