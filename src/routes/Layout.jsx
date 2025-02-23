import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from 'components/SideNav';

const Layout = () => {
  return (
    <React.Fragment>
      <SideNav outlet={<Outlet />} />
    </React.Fragment>
  );
};

export default Layout;
