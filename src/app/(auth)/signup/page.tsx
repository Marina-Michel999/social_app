"use client" 
import React, { useState } from 'react'
import {Box, Paper , TextField , Button, colors, FormLabel, RadioGroup, FormControlLabel, FormControl, Radio } from '@mui/material'
import Image from 'next/image'
import logo from '../../../assets/logo.png'
import theme from '@/theme'
import { useFormik } from 'formik';
import { login } from "@/store/features/user.slice";
import { useDispatch } from "react-redux";
import { useAppDispach } from "@/hooks/store.hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DatePicker, DatePickerToolbar } from '@mui/x-date-pickers/DatePicker';
import { signup } from '@/services/signup'


export default function Page() {
  // ^------------------------------------hooks----------------------------------
  const dispach = useAppDispach();
  const router = useRouter();
  const [showPassword , setshowPassword] = useState<boolean>(false);
  const [showRepassword , setshowRepassword] = useState<boolean>(false);
  const [signInMessage, setsignInMessage] = useState<string | null>(null);
  // &-------------------------------------validation-------------------------------------
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const userNameRegex = /^[a-zA-Z][a-zA-Z0-9]*[_]?[a-zA-Z0-9]+$/
  const validationSchema = yup.object({
    email: yup.string().required("*Email is requird").email("Email is invalid"),
    password: yup
      .string()
      .required("*Password is requird")
      .matches(
        passRegex,
        "Write minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      ),
      rePassword:yup.string().required("Confirm password is requird").oneOf([yup.ref("password")] , "password should be the same"),
      gender:yup.string().required("gender is requird"),
      username:yup.string().required("username is requird").matches(userNameRegex ,  "Username must start with a letter, can contain letters, numbers,  symbol (_), and cannot end with a symbol. Ex: example123 or Example_123")
  });
  // *---------------------------------------formik-------------------------------------
    const formik = useFormik({
    initialValues: {
        name: "",
        username: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        rePassword: ""
    },
    validationSchema,
    onSubmit:handleSignUp, 
    // (values) => {
    //   dispach(signup(values))
      
    //     // .then((res) => {
    //     //   console.log(res)
    //     //   if ((res.payload.success === "true")) {
    //     //     toast.success(res.payload.message);
    //     //     setTimeout(() => {
    //     //       router.push("/login");
    //     //     }, 2000);
    //     //   } else if ((res.payload.success === "false")) {
    //     //     console.log(res);
    //     //     toast.error(res.payload.message);
    //     //   }
    //     // })
    //     // .catch(() => {
    //     //   toast.error("wong email or password");
    //     //   setLogInMessage("wong email or password");
    //     // });
    // },
  });
  // ^--------------------------------------functions--------------------------------
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(e);
    formik.handleChange(e);
    setsignInMessage(null);
  }
  function handleShowingPassword() {
    setshowPassword(!showPassword)
  };
  function handleShowingRepassword() {
    setshowRepassword(!showRepassword)
  };
  async function handleSignUp(values:{ name: string,
    username: string,
    email: string,
    dateOfBirth: string,
    gender: string,
    password: string,
    rePassword: string
}) {
    const res = await signup(values);
    try {
          if ((res?.success === true)) {
            toast.success(res.message);
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          } else if ((res?.success === false)) {
            console.log(res);
            toast.error(res.message);
          }

    } catch (error) {
          toast.error("you have the same acount or user name");
          console.log(error)
    }
  }
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#F1F1F1",
          width: "100%",
          paddingBlock: 5,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 5,
            width: { xs: "21.5rem", sm: "31.25rem", md: "37.5rem", xl: "43.75rem" },
            borderColor: "#E6E6E6",
            borderRadius: 5,
            m: "auto",
          }}
        >
        {/*-------------------------------------welcome back section----------------------------------*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image src={logo} width={140} alt="logo image" />
            <Box />
            <Box fontSize={25} component={"p"} paddingBottom={3}>
              Create Account{" "}
              <Box component={"span"} sx={{ color: "primary.main" }}>
                circlo
              </Box>
            </Box>
            <Box component={"p"} paddingBottom={3} >
              Join our community today
            </Box>
          </Box>
        {/*-------------------------------------------form------------------------------------------*/}

          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box sx={{ width: "100%" }}>
                <TextField
                  color="primary"
                  placeholder="example@gmail.com"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Full name"
                  variant="outlined"
                  name="name"
                  value={formik.values.name}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <Box
                    component={"p"}
                    sx={{ color: "red", fontSize: "0.75rem", textAlign: "start" }}
                  >
                    *{formik.errors.name}
                  </Box>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  color="primary"
                  placeholder="user name"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="user name"
                  variant="outlined"
                  name="username"
                  value={formik.values.username}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                  <Box
                    component={"p"}
                    sx={{ color: "red", fontSize: "0.75rem", textAlign: "start" }}
                  >
                    *{formik.errors.username}
                  </Box>
                )}
              </Box>        
              <Box sx={{ width: "100%" }}>
                <TextField
                  color="primary"
                  placeholder="example@gmail.com"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <Box
                    component={"p"}
                    sx={{ color: "red", fontSize: "0.75rem", textAlign: "start" }}
                  >
                    *{formik.errors.email}
                  </Box>
                )}
              </Box>                    
              <Box sx={{ width: "100%" }}>
                <FormLabel color="primary" sx={{ color: "primary.main" }}>Date of birth</FormLabel>
                <TextField
                  color="primary"
                  type='date'
                  placeholder=""
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  variant="outlined"
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <Box
                    component={"p"}
                    sx={{ color: "red", fontSize: "0.75rem", textAlign: "start" }}
                  >
                    *{formik.errors.dateOfBirth}
                  </Box>
                )}
              </Box>
              <FormControl sx={{alignSelf:"flex-start"}}>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>

              <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "100%" , position:"relative"}}>
                <TextField
                  color="primary"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  name="password"
                  value={formik.values.password}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <Box sx={{position:"absolute" , right:"0.62rem" , top:"50%" , transform: "translateY(-50%)"}}>
                  {showPassword 
                  ?<VisibilityOffIcon onClick={handleShowingPassword} sx={{ color:"primary.main" , }}/> 
                  :<VisibilityIcon onClick={handleShowingPassword} sx={{ color:"primary.main" , }}/>
                  }
                </Box>
                </Box>
                  {formik.values.password &&  
                  <Box >
                    <Box >

                    </Box>
                  </Box>
                  }

                {formik.touched.password && formik.errors.password && (
                  <Box
                    component={"p"}
                    sx={{ color: "red", fontSize: "0.75rem", textAlign: "start" }}
                  >
                    *{formik.errors.password}
                  </Box>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "100%" , position:"relative"}}>
                <TextField
                  color="primary"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="repassword"
                  type={showRepassword ? 'text' : 'password'}
                  variant="outlined"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <Box sx={{position:"absolute" , right:"0.62rem" , top:"50%" , transform: "translateY(-50%)"}}>
                  {showRepassword 
                  ?<VisibilityOffIcon onClick={handleShowingRepassword} sx={{ color:"primary.main" , }}/> 
                  :<VisibilityIcon onClick={handleShowingRepassword} sx={{ color:"primary.main" , }}/>
                  }
                </Box>
                </Box>
                  {formik.touched.rePassword && formik.errors.rePassword && (
                  <Box
                    component={"p"}
                    sx={{ color: "red", fontSize: "0.75rem", textAlign: "start" }}
                  >
                    *{formik.errors.rePassword}
                  </Box>
                )}
              </Box>

              {signInMessage && (
                <Box component={"p"} color={"red"} fontSize={"1.125rem"}>
                  {signInMessage}
                </Box>
              )}


              <Button
                type="submit"
                sx={{ color: "#fff", paddingBlock: 1 }}
                fullWidth
                color="primary"
                variant="contained"
              >
              login
              </Button>
            </Box>
          </form>
        {/*--------------------------------------move to sign up-----------------------------------*/}
          <Box textAlign={"center"} paddingBlock={3} component={"p"}>
            {" "}
            Don`t have an account?
            <Box
              component={"span"}
              sx={{ color: "primary.main", cursor: "pointer" }}
            >
              {" "}
              Sign Up
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

