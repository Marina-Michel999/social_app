"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Button, Divider, Paper } from '@mui/material';
import { Comment, Post } from '@/types/post.types';
import Image from 'next/image';
import TopComment from '../TopComment/TopComment';
import Link from 'next/link';
import { useAppDispach, useAppSelector } from '@/hooks/store.hooks';
import { getPostDetails } from '@/store/features/posts.slice';
import { getPostComments } from '@/services/PostComments';
//^---------------------------------------------------------------------
//^---------------------------------------------------------------------

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));
export default function PostCard({postInfo}: {postInfo : Post}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
//^---------------------------------------------------------------------
  const [showMoreComments , setShowMoreComments] = React.useState(false)
  const [postComments , setPostComments] = React.useState<Comment[] | null>(null)
  const token = useAppSelector((state)=> state.userReducer.token)
  //! search what is the difference between get token here and in the function
  const dispach = useAppDispach()
  // let comments:Comment[] | null = null
  
  async function HandleShowingComments() {
    const newValue:boolean = !showMoreComments;
    setShowMoreComments(newValue) 
  console.log(newValue)
  if (newValue === true) {
    const comments: Comment[] = await getPostComments(postInfo.id , token)
    setPostComments(comments)
    
    console.log(comments)
    // console.log(postComments)
  }
  else if (newValue === false) {
    setPostComments(null)
    console.log(postComments)
  }

}

//^---------------------------------------------------------------------
console.log(postComments)
  return (
    <Card sx={{ width:'100%', marginBottom :"30px" }}>
      <CardHeader
        avatar={
          <Image width={"50"} height={"50"} src={postInfo.user.photo} alt={postInfo.user.name} style={{borderRadius:"50%"}}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postInfo.user.name}
        subheader={new Date(postInfo.createdAt).toDateString() }
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postInfo.body}
        </Typography>
      </CardContent>
      {postInfo.image && 
      <CardMedia
        component="img"
        height="194"
        image={postInfo.image}
        alt="post image"
      />
      
      }
      <CardActions disableSpacing sx={{display:"flex" , justifyContent:"space-between"}}>
        <Box display={"flex"}>
          <Box display={"flex"} sx={{verticalAlign:"center" , padding:"8px"}}>
            {postInfo.likesCount > 0 && <Box component={"p"} fontSize={18} sx={{ display:"inline-block", alignSelf:"flex-end" , paddingX:"3px"}}>{postInfo.likesCount}</Box> }
            <IconButton aria-label="add to favorites" sx={{ padding:0}}>
              <FavoriteBorderIcon sx={{color:'primary.main'}}></FavoriteBorderIcon>
            </IconButton>
          </Box>
          <Box display={"flex"} sx={{verticalAlign:"center" , padding:"8px"}}>
            {postInfo.commentsCount > 0 && <Box component={"p"} fontSize={18} sx={{ display:"inline-block", alignSelf:"flex-end" , paddingX:"3px"}}>{postInfo.commentsCount}</Box> }
            <IconButton aria-label="commment" sx={{ padding:0}}>
              <ChatBubbleOutlineIcon sx={{color:'primary.main'}}></ChatBubbleOutlineIcon>
            </IconButton>
          </Box>
          <Box display={"flex"} sx={{verticalAlign:"center" , padding:"8px"}}>
            {postInfo.sharesCount > 0 && <Box component={"p"} fontSize={18} sx={{ display:"inline-block", alignSelf:"flex-end" , paddingX:"3px"}}>{postInfo.sharesCount}</Box> }
            <IconButton aria-label="share" sx={{ padding:0}}>
              <ShareIcon sx={{color:'primary.main'}} />
            </IconButton>
          </Box>

        </Box>
        

        <IconButton aria-label="save " sx={{color:'primary.main'}}>
          <BookmarkBorderIcon></BookmarkBorderIcon>
        </IconButton>
      </CardActions>
      {postInfo.topComment ? 
      <>
          <Divider>Comment</Divider>
          {postComments ? postComments.map((comment)=>{return<Box key={comment._id} sx={{paddingY:"15px" , paddingX:"10px"}}>
            {}
            <Paper elevation={1} sx={{backgroundColor:"#F1F1F1" , borderRadius:"15px"  }}>
                <TopComment commmentInfo={comment}></TopComment>
            </Paper>
          </Box>

            

          }):  <Box  sx={{paddingY:"15px" , paddingX:"10px"}}>
            {}
            <Paper elevation={1} sx={{backgroundColor:"#F1F1F1" , borderRadius:"15px"  }}>
                <TopComment commmentInfo={postInfo.topComment}></TopComment>
            </Paper>
          </Box>
         
          }
          <Button
                sx={{ color: "#fff", paddingBlock: 1 }}
                fullWidth
                color="primary"
                variant="contained"
                onClick={HandleShowingComments}
              >
                show more comments
                {/* <Link href={`post/${postInfo.id}`}>show more comment</Link> */}
              
          </Button>

      </>
      :""}
    </Card>
  );
}
