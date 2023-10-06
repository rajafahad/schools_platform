import { configureStore } from "@reduxjs/toolkit";
import enrollStudentReducer from "./Slices/enrollStudentSlice";
import modalReducer from './Slices/modalSlice'
const store  = configureStore({
    reducer:{
        enrollStudentState:enrollStudentReducer,
        modal:modalReducer
    }
})


export default store;