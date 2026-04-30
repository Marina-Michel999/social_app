import { Box, Button, styled, TextField } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getCookie } from 'cookies-next/client';
import { useAppSelector } from '@/hooks/store.hooks';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PostForm() {
      const token = useAppSelector((store)=>store.userReducer.token)
      const postContentRef = useRef<HTMLInputElement>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);
      const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });
    function clearInputs() {
      postContentRef.current!.value = "";
      fileInputRef.current!.value = "";
    }
    function creatToast(status:boolean , message:string) {
      if (status === true) {
        toast.success(message);
      } else if (status === false) {
        toast.error(message);
      } else {
        toast.loading(message);
      }
    }
    async function createPost() {
      const postContent = postContentRef.current?.value || "";
      const file = fileInputRef.current?.files?.[0];
      console.log("post content: ", postContent);
      console.log("file: ", file);
      const formData = new FormData();
      formData.append("body", postContent );
      if (file) {
      formData.append("image", file );
      }
      console.log("formData: ", formData);

      const options = {
        url : `https://route-posts.routemisr.com/posts`,
        method: "POST",
        headers:{
            AUTHORIZATION:`Bearer ${token}`
        },
         data: formData
      }
      const { data } = await axios(options);
      console.log("post created: ", data);
      clearInputs()
      creatToast(data.success, data.message)
    }

  return (
    <>
      <Box sx={{width:{ xs:"300px", sm:"400px" , md:"500px" , lg:"700px" } , mx:"auto" , mt:2 , p:2 , backgroundColor:"#fff" , borderRadius:"10px" , gap:2 , display:"flex" , flexDirection:"column"}}>
        <TextField multiline fullWidth rows={4} placeholder='What is on your mind?' variant='standard' inputRef={postContentRef}></TextField>
        <Box sx={{display:"flex" , justifyContent:"space-between" , alignItems:"center" , color:"#ffffff"}}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{color:"#ffffff"}}
          >
            Upload files
            <VisuallyHiddenInput type="file" ref={fileInputRef}/>
          </Button>
          <Button variant="contained" endIcon={<SendIcon />} sx={{color:"#ffffff"}}
          onClick={createPost}>
            Post
          </Button>
        </Box>
      </Box>
    </>
  )
}
