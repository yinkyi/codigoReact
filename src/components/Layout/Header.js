import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useHistory } from 'react-router-dom';
import { Fragment} from 'react';
import React from 'react';
const Header = (props) => {  

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler=()=>{
    dispatch(authActions.logout());
    history.replace('/');
  }
  return (
    <Fragment>       
          <div className="flex justify-center md:justify-end ">
          {!props.isAuth && <button  type="button" onClick={props.onShowCartHandler} className="btn text-primary mt-2 md:border-2 border-primary hover:bg-red-500 hover:text-white transition ease-out duration-500">Log in</button>}
          {props.isAuth && <button type="button" onClick={logoutHandler} className="btn text-primary  mt-2 ml-2 md:border-2 border-primary hover:bg-red-500 hover:text-white transition ease-out duration-500">Logout</button>}
          </div>
    </Fragment>
  );
};

export default React.memo(Header);
