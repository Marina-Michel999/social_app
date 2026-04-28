import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userState } from "@/types/user.types";
import axios from "axios";
// import {setCookie} from "cookies-next/server";
import {getCookie , setCookie } from "cookies-next/client";
import { get } from "http";
export const login = createAsyncThunk('user/login', async (values:{email:string, password:string})=>{
    //^createAsyncThun ==> from redux toolkit to make async action and handle it in extra reducers
    //^1st parameter ==> action type ???? slice name / action name
    //^2nd parameter ==> async function that will be called when the action is dispatched
    //^what is the action? an object that has a type property and a payload property
    //^example of action ==> {type: 'user/login/fullfilled', payload: data}

    const options = {
        url : `https://route-posts.routemisr.com/users/signin`,
        method: "post",
        data:values
    }

  const {data} = await axios.request(options);
  //! why it doesnt want use let??????
  return data
  //^what is the return value of this function is it data only or data with action? 
})


// const accessToken:string | null = useCookie(null);
const initialState : userState = {
    token :  getCookie('token') || null //! why client ????/
}
const userSlice = createSlice({
    //!why it doesnt ask for type
    name :"user",
    initialState,
    reducers:{},
    extraReducers: function (builder) {
        //!why it doesnt ask for builder type
        builder.addCase(login.fulfilled , (state , action)=>{
            console.log("success")
            console.log(state)
            console.log(action)
            state.token = action.payload.data.token
            // localStorage.setItem('token' , action.payload.data.token )
            // document.cookie = `token=${action.payload.data.token}; path=/; expires = fri, 31 dec 9999 23:59:59 gmt;`
            setCookie('token' , action.payload.data.token , {maxAge: 3600 * 10000000, path:'/'}) // ! why client ?
        })
        builder.addCase(login.rejected , (state , action)=>{
            console.log("fails")
            console.log(state)
            console.log(action)
        })
    }
})

export const userReducer = userSlice.reducer