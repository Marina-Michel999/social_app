"use client" 
import React, { useState } from 'react'
import {Box, Paper , TextField , Button, colors} from '@mui/material'
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
import Link from 'next/link'
export default function Page() {
  // ^------------------------------------hooks----------------------------------
  const dispach = useAppDispach();
  const router = useRouter();
  const [showPassword , setshowPassword] = useState<boolean>(false);
  const [logInMessag, setLogInMessage] = useState<string | null>(null);
  // &-------------------------------------validation-------------------------------------
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = yup.object({
    email: yup.string().required("*Email is requird").email("Email is invalid"),
    password: yup
      .string()
      .required("*Password is requird")
      .matches(
        passRegex,
        "Write minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      ),
  });
  // *---------------------------------------formik-------------------------------------
    const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispach(login(values))
        .then((res) => {
          if ((res.payload.data.sucess = "true")) {
            toast.success("welcome back");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          } else if ((res.payload.data.sucess = "false")) {
            console.log(res.payload);
            toast.error("wong email or passwqrd");
          }
        })
        .catch(() => {
          toast.error("wong email or password");
          setLogInMessage("incorrect email or password");
        });
    },
  });
  // ^--------------------------------------functions--------------------------------
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(e);
    formik.handleChange(e);
    setLogInMessage(null);
  }
  function handleShowingPassword() {
    setshowPassword(!showPassword)
  };

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
              Welcome back to{" "}
              <Box component={"span"} sx={{ color: "primary.main" }}>
                circlo
              </Box>
            </Box>
            <Box component={"p"} paddingBottom={3}>
              Sign in to continue
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
                {formik.touched.password && formik.errors.password && (
                  <Box
                    component={"p"}
                    sx={{ color: "red", fontSize: "0.75rem", textAlign: "start" }}
                  >
                    *{formik.errors.password}
                  </Box>
                )}
              </Box>
              {logInMessag && (
                <Box component={"p"} color={"red"} fontSize={"1.125rem"}>
                  {logInMessag}
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
              <Link href={"/signup"}>Sign Up</Link>
              
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
