import React, { useState } from 'react';

import { Card, Divider, Avatar, Box, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';import moment from 'moment';

const Post = ({ post, setCurrentId, name, profilePicture }) => {
  const [liked, setLiked] = useState(false);
  const [disable, setDisable] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  async function likePost(_id, likeCount) {
    setDisable(true);
    if (liked) likeCount = likeCount - 1
    else likeCount = likeCount + 1
    const req = await fetch("http://localhost:1337/api/likePost", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        token,
        likeCount,
      })
    });
    const data = await req.json();
    console.log(data);
    setLiked(!liked);
    setDisable(false);
  }

  async function deletePost(_id) {

    const req = await fetch("http://localhost:1337/api/deletePost", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id
      })
    });
    const data = await req.json();
    console.log(data);
  }

  function goToProfile() {

    localStorage.setItem('id', post._id)

    // localStorage.setItem('_id',post._id)
    window.location.href = "/profile";
  }
  return (
    post ?
      <Card className="card" sx={{ borderRadius: 2 }}>
        <Box className='centered' sx={{ p: 1 }}>

          <Box className='centered' sx={{ justifyContent: 'flex-start' }}>
            <Avatar src={profilePicture} className='avatar2'>{name[0]}</Avatar>
            <Box sx={{ ml: 1, cursor: 'pointer' }} onClick={() => goToProfile()}>
              <Typography variant="body1" sx={{ p: 0, m: 0, color: 'black', fontWeight: '800' }} >{name}</Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>{moment(post.createdAt).fromNow()}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>

          </Box>
          <Button style={{ color: 'gray' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
        </Box>
        {/* <CardMedia sx={{ height:1400,display:'flex' }} image={post.selectedFile} title={post.title} /> */}
        <img src={post.selectedFile} style={{ width: '100%', height: '100%' }} alt="signIN" />
        {/* <Image style={{ height:1400,width:500,display:'flex' }} src={post.selectedFile}></Image> */}

        <Box className='postBottom'>
          <Box className='centered'>
          
          <Button size="small" color="primary" ><SentimentSatisfiedAltIcon fontSize="small" color='secondary' /><ThumbUpIcon fontSize="small" /><Typography>{post.likeCount}</Typography> </Button>
          <Typography>0 comments</Typography>
          </Box>
          <Divider sx={{my:1}}/>
          
          <CardActions className='cardActions'>
            <Button size="small" color="primary" disabled={disable ? true : false} onClick={() => likePost(post._id, post.likeCount)}><ThumbUpIcon color={liked ? 'primary' : 'disabled'} fontSize="small" /> Like  </Button>
            <Button size="small" color="primary" ><ChatBubbleIcon fontSize="small" /> comments</Button>
            <Button size="small" color="primary" onClick={() => deletePost(post._id)}><DeleteIcon fontSize="small" /> Delete</Button>
          </CardActions>
        </Box>
      </Card>
      : <></>
  );
};

export default Post;