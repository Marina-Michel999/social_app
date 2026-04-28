import { Comment, Post, postState } from "@/types/post.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
const initialState : postState = {
    posts : null,
    postComments : null
}

export const getAllPosts = createAsyncThunk< Post[] , void , {state:RootState}>('user/allPosts', async (_, myStore)=>{
    const state:RootState = myStore.getState()
    console.log(state)
    //^frist param ==> is what I will send to fu like values in login
    //^second param ===> store (getState)==> destructed from store
    // const state:any = getState()
    // console.log(state)
    // //* what is state
    console.log("-----------------state------------")
    const token = state.userReducer.token
    console.log(token)
    const options = {
        url : `https://route-posts.routemisr.com/posts`,
        method: "GET",
        headers:{
            AUTHORIZATION:`Bearer ${token}`
        
        }
        

    }

  const {data} = await axios.request(options);
  //! why it doesnt want use let??????
  console.log(
    '-----------------data------------'
  )
  console.log(data.data)
  console.log(data.data.posts)
  return data.data.posts
})




export const getPostDetails = createAsyncThunk< Comment[] , string , {state:RootState}>('post/postDetails', async (id:string , myStore)=>{
    const state:RootState = myStore.getState()
    const token = state.userReducer.token
    const options = {
        url : `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10
`,
        method: "GET",
        headers:{
            AUTHORIZATION:`Bearer ${token}`
        }
    }

  const {data} = await axios.request(options);
  console.log(data.comments)
  console.log(data.data.comments)
  return data.data.comments
})




const postSlice = createSlice({
    name :"post",
    initialState ,
    reducers : {
        clearComments:(state)=>{state.postComments = null}
    } ,
    extraReducers: function (builder) {
            //!why it doesnt ask for builder type
            builder.addCase(getAllPosts.fulfilled , (state , action)=>{
                state.posts = action.payload
            })
            builder.addCase(getAllPosts.rejected , (state , action)=>{
                console.log("post fails")
                console.log(state)
                console.log(action)
            })
                builder.addCase(getPostDetails.fulfilled , (state , action)=>{
                console.log("post details success")
                console.log(state)
                console.log("-----------------actions------------")
                console.log(action)
                state.postComments = action.payload
            })
            builder.addCase(getPostDetails.rejected , (state , action)=>{
                console.log("post details fails")
                console.log(state)
                console.log(action)
            })

        }
    
})
export const PostReducer = postSlice.reducer;
export const {clearComments} = postSlice.actions