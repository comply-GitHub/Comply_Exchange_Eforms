
import React, { Suspense } from 'react'
import Navbar from '../Navbar'
import LoadData from '../LoadData'
import { Outlet } from 'react-router'
import { CircularProgress } from '@mui/material'
import ErrorComponet from '../Reusable/ErrorComponent'
import WithAutoLogout from '../../autoLogoutComponent'


const EmptyComp = () => {
    return <></>
}

const AutoLogoutWrap = WithAutoLogout(EmptyComp);

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
                {/* <AutoLogoutWrap /> */}
                <ErrorComponet></ErrorComponet>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </Suspense>
    )
}

export default Layout