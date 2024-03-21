import { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { RouteType } from './types';
import PrivateRoute from './privateRoute';
import ROUTES from './routes';
import { CircularProgress } from '@mui/material';
// import AccessControlWrapper from './accessControlWrapper';
import "../App.scss"
import Navbar from "../Components/Navbar"
import LoadData from '../Components/LoadData';
import Layout from '../Components/Layout';
import Login from '../Components/login';

function RoutesWrapper() {

  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        {
          ROUTES.map(({ path, id, Component, isPrivate, name, roleName }: RouteType) => {
            //   if (isPrivate) {
            //     return (
            //       <Route
            //         key={id}
            //         path={path}
            //         element={
            //           <PrivateRoute>
            //             <AccessControlWrapper name={name} roleName={roleName}>
            //               <Component />
            //             </AccessControlWrapper>
            //           </PrivateRoute>
            //         }
            //       />
            //     );
            //   }
            return <Route key={id} path={`/${path}`} element={<Component />} />;
          })}
        <Route path='/' element={<Login />} />
      </Route>

    </Routes>
  );
}

export default RoutesWrapper;
