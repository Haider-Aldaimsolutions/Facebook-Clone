import { Container, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { FixedSizeList} from 'react-window';
import Posts from "../components/Posts/Posts";
import NavBar from "../components/NavBar";
import SocialMenu from "../components/SocialMenu";
import ActiviyMenu from "../components/ActivityMenu";

function Feed() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return localStorage.getItem("token") ? (
    <Box>
      <NavBar />
      <Box sx={{ flexGrow: 1,height: { md: '20px', sm: '60px', xs: '70px' } }}></Box>
      <Container maxWidth="xxl" >
      <Grid container>
        <Grid item md={3.5}>  
          <FixedSizeList
            className="no-scrollbars"
            height={600}
            width='auto'
            itemSize={46}
            itemCount={1}
            overscanCount={5}
            style={{marginTop:-15,marginLeft:-20,borderRadius:10}}
          >
            {ActiviyMenu}
          </FixedSizeList>
        </Grid>

        <Grid item xs={12} md={5} sm={8.5} sx={{justifyContent:'center',display:'center',flexDirection:'row'}}>

          <FixedSizeList
            className="no-scrollbars"
            // ??????????????????????? heightError???????????????????
            height={800}
            width='100%'
            itemSize={1000*5}
            itemCount={1}
          > 
            {Posts}
          </FixedSizeList>
        </Grid>

        <Grid item sm={3.5} sx={{justifyContent:'flex-end',display:'flex',flexDirection:'row'}}>
          <FixedSizeList
            className="no-scrollbars"
            height={600}
            width='auto'
            itemSize={46}
            itemCount={1}
            overscanCount={5}
          >
            {SocialMenu}
          </FixedSizeList>
        </Grid>
      </Grid>
      </Container>

    </Box>
  ) : (
    <Typography sx={{ alignItems: 'center', display: 'flex', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center' }}>
      Loading ...
    </Typography>

  );
}
export default Feed;