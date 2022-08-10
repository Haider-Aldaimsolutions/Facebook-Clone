import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';

const Post = ({ post, setCurrentId, name }) => {
  const [liked, setLiked] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  async function likePost(_id, likeCount) {
    if (liked) likeCount -= 1
    else likeCount += 1
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
      <Card className="card" >
        <CardMedia style={{ paddingTop: '100%', }} image={post.selectedFile} title={post.title} />
        <div className='overlay'>
          <Button size="small" color="primary" onClick={() => goToProfile()}>
            <Typography variant="h6" sx={{ color: 'white' }} >{name}</Typography>
          </Button>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className='overlay2'>
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
        </div>
        <div className='details'>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className='title' gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        <CardActions className='cardActions'>
          <Button size="small" color="primary" onClick={() => likePost(post._id, post.likeCount)}><ThumbUpIcon color={liked ? 'primary' : 'disabled'} fontSize="small" /> Like {post.likeCount} </Button>
          <Button size="small" color="primary" onClick={() => deletePost(post._id)}><DeleteIcon fontSize="small" /> Delete</Button>
        </CardActions>
      </Card>
      : <></>
  );
};

export default Post;