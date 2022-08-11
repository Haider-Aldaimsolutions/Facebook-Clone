import { Container, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Posts from "../components/Posts/Posts";
import NavBar from "../components/NavBar";
import SocialMenu from "../components/SocialMenu";
import ActiviyMenu from "../components/ActivityMenu";
import Form from "../components/Form/Form";

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
      <Box sx={{ flexGrow: 1, height: { md: '20px', sm: '80px', xs: '70px' } }}></Box>
      {/* <Container maxWidth="xxl" > */}
      <Grid container spacing={2}>

        <Grid container sm={3.5} >
          <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
            <ActiviyMenu />
          </Grid>
        </Grid>

        <Grid container xs={12} md={5} sm={8} >
          <Grid item>
            <Form />
            <Posts />
          </Grid>
        </Grid>

        <Grid container sm={3.5} sx={{ display: { xs: 'none', sm: 'block' }, justifyContent: 'flex-end' }} >
          <Grid item >
            <SocialMenu />
          </Grid>
        </Grid>

      </Grid>
      {/* </Container> */}
    </Box>
  ) : (
    <Typography sx={{ alignItems: 'center', display: 'flex', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center' }}>
      Loading ...
    </Typography>

  );
}
export default Feed;