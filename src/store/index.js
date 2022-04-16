// import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import packSliceReducer from "./pack-slice"
const store = configureStore({
    reducer:{auth:authReducer,classpack:packSliceReducer}
})



export default store;