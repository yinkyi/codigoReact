import Modal from '../UI/Modal';
import React, { useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth';
import { authLogin } from '../../lib/api';
const LoginCard = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const {sendRequest,data,error,status} = useHttp(authLogin);
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    sendRequest({
          email,
          password,
          returnSecureToken:true
    })
   
  }
  
  if(status === "completed" && !error){
     dispatch(authActions.login({
      token:data.access_token,
      expiredTime:data.expires_at
    })); 
    props.onHideCard();
    let currentPath = '/class-packs';
    history.replace(currentPath);
    setTimeout(() => {
        history.go(currentPath)
    }, 0)

  }
  let modelContent = <React.Fragment>    
       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
         <div className="text-center font-bold mb-10">
            <h2>Member Login</h2>
         </div>
         <form onSubmit={onSubmitHandler}>
          { error &&  <div>
            <p className="text-center text-red-500" >{error}</p>
          </div>}
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" ref={emailInputRef} type="email" placeholder="Email" required/>
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password"  required>
              Password
            </label>
            <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" ref={passwordInputRef} placeholder="******************"/>
          
          </div>
          <div className="text-center">
            <button  className="bg-indigo-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">
              Login
            </button>
          </div>
        </form>
    </div>
    

  </React.Fragment>
    
  
  return (
    <Modal onClick={props.onHideCard}>
      {modelContent}
    </Modal>
  )
}
export default LoginCard
