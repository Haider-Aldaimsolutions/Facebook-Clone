import { Grid, CircularProgress, Box } from '@mui/material';
import React, { useEffect, useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Form from '../Form/Form';
import Post from "./Post/Post";
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:1400');


function Posts(props) {
  const { index, setIndex } = props;
  const [allPosts, setAllPosts] = useState();
  const [refresh, setRefresh] = useState(true);
  const [allData, setData] = useState();
  var i = -1;

  async function getPosts() {
    const req = await fetch("http://localhost:1337/api/getPosts", {
      headers: {
      },
    });
    const data = await req.json();
    setAllPosts(data.posts);
    setData(data);
  }
  
  useEffect(() => {
    getPosts();
  },[refresh]);
  
  function sendSocketIO(){
    socket.emit('send update', 'postAdded');
  }

  socket.on('recieve update', (newMessage)=>{
    setRefresh(!refresh);
  });



  return (
    allPosts ?
      !allPosts.length ? <><Form sendSocketIO={sendSocketIO} refresh={refresh} setRefresh={setRefresh}/><Box className='circularProgress'> <CircularProgress /></Box></> : (
        <>
          <Form sendSocketIO={sendSocketIO} refresh={refresh} setRefresh={setRefresh}/>
          <ListItem  key={index} component="div" disablePadding>
            <Grid className='container'sx={{alignItems:"center" ,flexDirection:'column',justifyContent:'center'}} container  spacing={3}>
              {allPosts.map((post) => (
              i=i+1,
              <Grid sx={{width:{md:'100%',sm:'80%',xs:'100%'}}} key={post._id} item xs={12} sm={12} >
                <Post refresh={refresh} setRefresh={setRefresh} sendSocketIO={sendSocketIO} post={post} name={allData.names[i]} profilePicture={allData.profilePicture[i]} />
              </Grid>
              ))} 
            </Grid>
          </ListItem>
        </>
      )
      : <><Form sendSocketIO={sendSocketIO} refresh={refresh} setRefresh={setRefresh}/><Box className='circularProgress'> <CircularProgress /></Box></>
  );
}

export default Posts