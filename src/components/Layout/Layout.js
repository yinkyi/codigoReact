import Header from './Header';
import SideBar from './SideBar';
import { Fragment,useCallback,useState } from 'react';
import LoginCard from '../Card/LoginCard';

const Layout = (props) => {
  const [isCardShow,setIsCardShow] = useState(false);
  

  const showHideCartHandler = useCallback(()=>{
    setIsCardShow((isCardShow)=>!isCardShow);
  },[isCardShow])
 

  return ( 
    <Fragment>
      {isCardShow && <LoginCard onHideCard={showHideCartHandler}/>}
      <div className="grid md:grid-cols-3 ">
        <SideBar />
        <div className="px-2 py16 bg-gray-100 col-span-2">
            <Header onShowCartHandler = {showHideCartHandler}/>
            <main>{props.children}</main>
        </div>        
      </div>
    </Fragment>
  );
};

export default Layout;
