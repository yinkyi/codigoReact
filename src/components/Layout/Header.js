import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useHistory } from 'react-router-dom';
import { Fragment,useCallback,useState } from 'react';
import LoginCard from '../Card/LoginCard';
const Header = () => {  
  const [isCardShow,setIsCardShow] = useState(false);
  const isAuth = useSelector(state=>state.auth.isAuth);
  const history = useHistory();
  const dispatch = useDispatch();

  const showCartHandler = useCallback(()=>{
    setIsCardShow(true);
  },[])
  const hideCartHandler = useCallback(()=>{
    setIsCardShow(false);
  },[])
  
  const logoutHandler=()=>{
    dispatch(authActions.logout());
    history.replace('/');
  }
  
  return (
    <Fragment>
        {isCardShow && <LoginCard onHideCard={hideCartHandler}/>}
        <div className="flex justify-center md:justify-end ">
        {!isAuth && <button  type="button" onClick={showCartHandler} className="btn text-primary mt-2 md:border-2 border-primary hover:bg-red-500 hover:text-white transition ease-out duration-500">Log in</button>}
        {isAuth && <button type="button" onClick={logoutHandler} className="btn text-primary  mt-2 ml-2 md:border-2 border-primary hover:bg-red-500 hover:text-white transition ease-out duration-500">Logout</button>}
        </div>               
        
    </Fragment>
  );
};

export default Header;
