import Header from './Header';
import SideBar from './SideBar';
import { Fragment,useCallback,useState } from 'react';
import LoginCard from '../Card/LoginCard';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth';
const Layout = (props) => {
  console.log("Layout");
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(state=>state.auth.isAuth);
  const [isCardShow,setIsCardShow] = useState(false);
  

  const showHideCartHandler = useCallback(()=>{
    setIsCardShow((isCardShow)=>!isCardShow);
  },[])
 const successLogin = (data)=>{
  dispatch(authActions.login({
    token:data.access_token,
    expiredTime:data.expires_at
  })); 
  setIsCardShow(false);
  let currentPath = '/class-packs';
  history.replace(currentPath);
  // setTimeout(() => {
  //     history.go(currentPath)
  // }, 0)
 };

  return ( 
    <Fragment>
      {isCardShow && !isAuth ? <LoginCard onSuccessLogin={successLogin}/>:''}
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
