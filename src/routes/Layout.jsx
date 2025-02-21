import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from 'components/SideNav';

const Layout = () => {
  return (
    <React.Fragment>
      <div style={{ width: '100vw', height: '100vh' }}>
        <SideNav outlet={<Outlet />} />
      </div>
    </React.Fragment>
  );
};

export default Layout;
