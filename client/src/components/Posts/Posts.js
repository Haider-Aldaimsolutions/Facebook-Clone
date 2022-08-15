import { Grid, CircularProgress, Box } from '@mui/material';
import React, { useEffect, useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Form from '../Form/Form';
import Post from "./Post/Post";


function Posts(props) {
  const { index, style } = props;
  const [allPosts, setAllPosts] = useState();
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
  });

  function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    );
  }
  return (

    allPosts ?
      !allPosts.length ? <><Form/><Box className='circularProgress'> <CircularProgress /></Box></> : (
        <>
          {/* <Grid container >
            <Grid item sm={12} sx={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
              <ListItem style={style} key={index} component="div" disablePadding>

                <Grid sx={{width: { md: '100%', sm: '80%', xs: '100%' } }} key={index} item xs={12} sm={12} >
                      <Post post={allPosts[index]} name={allData.names[index]} />
                </Grid>
              
              </ListItem>
            </Grid>
          </Grid> */}
          <Form/>
          <ListItem  key={index} component="div" disablePadding>
            <Grid className='container'sx={{alignItems:"center" ,flexDirection:'column',justifyContent:'center'}} container  spacing={3}>
              {allPosts.map((post) => (
              i=i+1,
              <Grid sx={{width:{md:'100%',sm:'80%',xs:'100%'}}} key={post._id} item xs={12} sm={12} >
                <Post post={post} name={allData.names[i]} profilePicture={allData.profilePicture[i]} />
              </Grid>
              ))} 
            </Grid>
          </ListItem>
        </>
      )
      : <></>
  );
}

export default Posts