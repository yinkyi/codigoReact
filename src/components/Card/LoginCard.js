import Modal from '../UI/Modal';
import React, { useEffect, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { authLogin } from '../../lib/api';
const LoginCard = (props) => {
  console.log("Logincard",props);
  const {sendRequest,data,error,status} = useHttp(authLogin);
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    sendRequest({
          email,
          password
    })
   
  }
  useEffect(()=>{
    if(status === "completed" && !error){  
      props.onSuccessLogin(data);
    }
  },[status,error,data,props])
  
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
export default React.memo(LoginCard)
