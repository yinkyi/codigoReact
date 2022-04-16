import {createSlice} from '@reduxjs/toolkit';
import { logout } from '../lib/api';
const calculateRemainingTime=(expirationTime)=>{
    const currentTime =  new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}
const retrieveStoreToken = ()=>{
    const storeToken = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    const remainingTime = calculateRemainingTime(expirationTime);
    if(remainingTime <= 60000){
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    
        return {
            token:storeToken,
            duration:remainingTime
        }
    
}
const tokenData= retrieveStoreToken();

const initialAuthState = {
    isAuth:localStorage.getItem('isAuth')?localStorage.getItem('isAuth'):false,
    token:tokenData?tokenData.token:'',
    expiredIn:tokenData?tokenData.duration:0,
    logoutTimer:null

}
// useEffect(()=>{
//     if(tokenData){
//         setTimeout(authSlice.logout,tokenData.duration);
//     }

// },[tokenData])
const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    
    reducers:{        
        logout(state){
            logout({
                apiToken:state.token
            });
            state.isAuth=false;
            state.token='';
            state.expiredIn=0;
            
            localStorage.removeItem("isAuth");
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
            localStorage.removeItem("expiredIn");
            localStorage.removeItem("selected_pack");
            clearTimeout(state.logoutTimer);
            state.logoutTimer=null;
            
        },
        login(state,action){
            state.isAuth=true;
            state.token=action.payload.token;
            let expiredIn = calculateRemainingTime(action.payload.expiredTime);
            state.expiredIn = expiredIn;
            localStorage.setItem("isAuth",true);
            localStorage.setItem("expiredIn",expiredIn);
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("expirationTime",action.payload.expiredTime);
        },
        setTimer(state,action){
            state.logoutTimer = action.payload;
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;