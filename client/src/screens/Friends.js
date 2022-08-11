import { Container,Box,Grid,Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Posts from "../components/Posts/Posts";
import NavBar from "../components/NavBar";
import SocialMenu from "../components/SocialMenu";
import ActiviyMenu from "../components/ActivityMenu";
import Form from "../components/Form/Form";
import People from "../components/People/People";

function Friends() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return localStorage.getItem("token") ?(
    <Box>
      <NavBar/>
      <Box sx={{height:{md:'20px',sm:'80px',xs:'70px'}}}></Box>
        <Container maxWidth="xxl" >
          <Grid container spacing={2}>
            
            <Grid item sm={3.5} sx={{display:{xs:'none',md:'block'}}}>
              <ActiviyMenu/>
            </Grid>
            
            <Grid item xs={12} md={5} sm={8}>
             <Typography align="center" variant="h5">Friend Requests</Typography>

             <Typography align="center" variant="h5">People you may know</Typography>
             <People/>
            </Grid>

            <Grid item sm={3.5} sx={{display:{xs:'none',sm:'block'},justifyContent:'flex-end'}}>
              <SocialMenu/>
            </Grid>
          
          </Grid>
        </Container>      
    </Box>
  ): (
    <Typography sx={{alignItems:'center',display:'flex',top:0,bottom:0,left:0,right:0,position:'absolute',justifyContent:'center'}}> 
      Loading ...
    </Typography>  
    
  );
}
export default Friends;