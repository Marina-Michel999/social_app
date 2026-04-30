"use client" 
import Image from "next/image";
import styles from "./page.module.css";
import PostCard from "@/component/PostCard/PostCard";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import { myStore } from "@/store/store";
import { useAppDispach, useAppSelector } from "@/hooks/store.hooks";
import { useEffect } from "react";
import {  getAllPosts } from "@/store/features/posts.slice";
import Loading from "@/component/Loading/Loading";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";


export default function Home() {
  const router = useRouter();
  console.log(myStore)
  const dispach = useAppDispach();
  useEffect(()=>{
    dispach(getAllPosts())
    const token: string | null | undefined = getCookie("token");
     if (!token) {
      router.push("/login");
    }
  } , [])
  const {posts} = useAppSelector((store)=>{return store.PostReducer})
    const {postComments} = useAppSelector((store)=>store.PostReducer)
    // dispach(clearComments())
    console.log(postComments)
  
  return (
    <>
    <Box sx={{paddingTop:"60px" ,   background: "#F1F1F1", minHeight:"100%"}}>
      <Box  sx={{width:{ xs:"300px", sm:"400px" , md:"500px" , lg:"700px" } , mx:"auto" , md:{width:"300px"} , lg:{width:"300px"}}}>
        {posts ? posts.map((post)=> <PostCard key={post._id} postInfo={post}></PostCard> ) : <Loading></Loading>}
      </Box>      
    </Box>    
    </>
  );
}
