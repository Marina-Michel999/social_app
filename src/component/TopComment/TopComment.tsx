import { Comment } from '@/types/post.types'
import { CardHeader, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function TopComment({commmentInfo} : {commmentInfo: Comment }) {
  return (
    <>
      <CardHeader
        avatar={
          <Image  width={"30"} height={"30"} src={commmentInfo.commentCreator.photo} alt={commmentInfo.commentCreator.username} style={{borderRadius:"50%"}}/>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={commmentInfo.commentCreator.username}
        subheader={new Date(commmentInfo.createdAt).toDateString() }
        sx={{paddingY:"7px"}}
      />
      <Typography sx={{paddingLeft:"20px" , paddingBottom:"12px" , fontSize:"14px"}}>{commmentInfo.content}</Typography>

    </>
  )
}
