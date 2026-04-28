import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export async function signup(values:{
    name: string,
    username: string,
    email: string,
    dateOfBirth: string,
    gender: string,
    password: string,
    rePassword: string
}) {
    try {
            const options= {
            url : `https://route-posts.routemisr.com/users/signup`,
            method: "post",
        data: {
            name: values.name,
            username:values.username,
            email:values.email,
            dateOfBirth:values.dateOfBirth,
            gender:values.gender,
            password:values.password,
            rePassword:values.rePassword,
          }
        }
        const {data} = await axios.request(options)
        console.log(data)  
        return data      
    } catch (error) {
         console.log(error);
        throw error;
    };


}

// export const signup = createAsyncThunk('user/Signup', async (values:{
    // name: string,
    // username: string,
    // email: string,
    // dateOfBirth: string,
    // gender: string,
    // password: string,
    // rePassword: string
// })=>{
//     const options = {
//         url : `https://route-posts.routemisr.com/users/signup`,
//         method: "post",
//         data:values
//     }

//   const {data} = await axios.request(options);
//   //! why it doesnt want use let??????
//   return data
// })
