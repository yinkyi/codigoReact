import { Fragment } from 'react';
import Header from './Header';
import SideBar from './SideBar';

const Layout = (props) => {
  return (
    <Fragment>
      <div className="grid md:grid-cols-3 ">
        <SideBar />
        <div className="px-2 py16 bg-gray-100 col-span-2">
            <Header/>
            <main>{props.children}</main>
        </div>        
      </div>
    </Fragment>
  );
};

export default Layout;
