import { Grid,CircularProgress,Box } from '@mui/material';
import React,{useEffect,useState} from "react";
// import Form from '../Form/Form';
import Post from "./Post/Post";
// import DraftsIcon from '@mui/icons-material/Drafts';


function Posts() {
  const[allPosts,setAllPosts]=useState();
  const[allData,setData]=useState( );
  var i=-1;

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
  
  return (
    
    allPosts?
     !allPosts.length ?<Box className='circularProgress'> <CircularProgress/></Box> : (
      <>
      <Grid className='container'sx={{alignItems:"center" ,flexDirection:'column',justifyContent:'center'}} container  spacing={3}>
        {allPosts.map((post) => (
          i=i+1,
          <Grid sx={{width:{md:'100%',sm:'80%',xs:'100%'}}} key={post._id} item xs={12} sm={12} >
            <Post post={post} name={allData.names[i]} />
          </Grid>
         ))} 
      </Grid>
      </>
     )
   :<></>     
  );
}

export default Posts