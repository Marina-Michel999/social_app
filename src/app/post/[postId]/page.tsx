"use client"
import Loading from "@/component/Loading/Loading"
import PostCard from "@/component/PostCard/PostCard"
import TopComment from "@/component/TopComment/TopComment"
import { useAppDispach, useAppSelector } from "@/hooks/store.hooks"
import { getPostDetails } from "@/store/features/posts.slice"
import { Box, Paper } from "@mui/material"
import { useParams } from "next/navigation"
import { use, useEffect } from "react"

 
export default function PostDetails({params} : {params: Promise<{postId:string}>})
 {
  const {postId} = use(params)
  const dispach = useAppDispach()
  useEffect(()=>{
    dispach(getPostDetails(postId))
  } , [])
     const {postComments} = useAppSelector((store)=>store.PostReducer)
     console.log(postComments)
  return <>
    {postComments ? postComments.map((comment)=>{return<>
    {/* <PostCard></PostCard> */}
      <Paper elevation={1} sx={{backgroundColor:"#F1F1F1" , borderRadius:"15px" , marginY:"25px" }}>
        <TopComment commmentInfo={comment} key={comment._id}/>
      </Paper>
    
    </>}
    )
    : <Loading></Loading>}
  </>
}
