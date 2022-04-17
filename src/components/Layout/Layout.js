import Header from './Header';
import SideBar from './SideBar';
import { Fragment,useCallback,useState } from 'react';
import LoginCard from '../Card/LoginCard';
import { useSelector } from 'react-redux';
const Layout = (props) => {
  const isAuth = useSelector(state=>state.auth.isAuth);
  const [isCardShow,setIsCardShow] = useState(false);
  

  const showHideCartHandler = useCallback(()=>{
    setIsCardShow((isCardShow)=>!isCardShow);
  },[isCardShow])
 

  return ( 
    <Fragment>
      {isCardShow && <LoginCard onHideCard={showHideCartHandler}/>}
      <div className="grid md:grid-cols-3 ">
        <SideBar isAuth={isAuth}/>
        <div className="px-2 py16 bg-gray-100 col-span-2">
            <Header isAuth={isAuth} onShowCartHandler = {showHideCartHandler}/>
            <main>{props.children}</main>
        </div>        
      </div>
    </Fragment>
  );
};

export default Layout;
