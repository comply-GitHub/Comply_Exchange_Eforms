
import React, { Suspense } from 'react'
import Navbar from '../Navbar'
import LoadData from '../LoadData'
import { Outlet } from 'react-router'
import { CircularProgress } from '@mui/material'
import ErrorComponet from '../Reusable/ErrorComponent'

const Layout = () => {
    return (
        <Suspense
            fallback={
                <div className="loding_spinner">
                    <CircularProgress />
                </div>
            }
        >
            <div className="layout" >
                <div className="nav">
                    <Navbar />
                    <LoadData />
                </div>
                <ErrorComponet></ErrorComponet>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </Suspense>
    )
}

export default Layout