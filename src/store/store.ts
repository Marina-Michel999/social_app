import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";
import { PostReducer } from "./features/posts.slice";
export const myStore = configureStore({
    reducer :{
        userReducer,
        PostReducer
    }
})

//get type of store and put it in avariable

type appStore = typeof myStore;


//*myStore.getState. ==> get states of all app mean shape and all things in appstore
//
export type RootState = ReturnType<appStore["getState"]>
//! why appStore not store
// ~ explanition
//1. makind a type that return all the app state (rootState)
// 2.appStore["getState"] ==> return type of the returned from "getState" method
// ^ make this for user selector to access any thing inside the store

export type AppDispach = appStore["dispatch"]

//! why not use ReturnType<appStore["dispatch"]>

//^ we have 2 options
//^[1] useSelector((myStore:rootState)=>{myStore.userReducer})
//^ [2] make custmization on useSelector() and useDispach() hooks by giving them the types in all app
//& go to hook folder

