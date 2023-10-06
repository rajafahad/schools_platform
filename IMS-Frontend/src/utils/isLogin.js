import React from 'react'
import {Navigate, Outlet} from "react-router-dom"


const IsLogin = () => {
    const isAuthenticated = !!localStorage.getItem('token'); 

    if(isAuthenticated) {
        return <Navigate to="/"  replace />
    }
 return <Outlet/>
}

export default IsLogin