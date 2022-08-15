import { Container, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { FixedSizeList, VariableSizeList } from 'react-window';
import Posts from "../components/Posts/Posts";
import NavBar from "../components/NavBar";
import SocialMenu from "../components/SocialMenu";
import ActiviyMenu from "../components/ActivityMenu";
import People from "../components/People/People";

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
      <Box sx={{ flexGrow: 1,height: { md: '20px', sm: '80px', xs: '70px' } }}></Box>
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
            itemSize={100*5}
            itemCount={1}
          > 
            {People}
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
    // <Box>
    //   <NavBar />
    //   <Box sx={{ flexGrow: 1,height: { md: '20px', sm: '80px', xs: '70px' } }}></Box>
    //   <Container maxWidth="xxl" >
    //   <Grid container>
    //     <Grid item xs={0} sm={0} md={2} >
    //       <Box sx={{display:{xs:'none',md:'block'}}}>
    //       <FixedSizeList
    //         className="no-scrollbars"
    //         height={700}
    //         width='auto'
    //         itemSize={46}
    //         itemCount={1}
    //         overscanCount={5}
    //         style={{backgroundColor:'white',marginTop:-15,marginLeft:-15,borderRadius:10}}
    //       >
    //         {ActiviyMenu}
    //       </FixedSizeList>
    //       </Box>
    //     </Grid>

    //     <Grid item xs={12} sm={9} md={8}  sx={{justifyContent:'center',display:'center',flexDirection:'row'}}>
         
    //       <FixedSizeList
    //         className="no-scrollbars"
    //         height={700}
    //         width='60%'
    //         itemSize={10}
    //         itemCount={1}
    //       > 
    //           {People}
    //       </FixedSizeList>
       
    //     </Grid>

    //     <Grid item xs={0} sm={3} md={2} sx={{justifyContent:'flex-end',display:'flex',flexDirection:'row'}}>
    //       <FixedSizeList
    //         className="no-scrollbars"
    //         height={700}
    //         width='auto'
    //         itemSize={46}
    //         itemCount={1}
    //         overscanCount={5}
    //       >
    //         {SocialMenu}
    //       </FixedSizeList>
    //     </Grid>
    //   </Grid>
    //   </Container>


    //   {/* <Grid container spacing={2}>

    //       <Grid item sm={3.5}  sx={{ display: { xs: 'none', md: 'block' } }}>
    //         <ActiviyMenu />
    //       </Grid>

    //       <Grid item xs={12} md={5} sm={8}>
    //         <Form />
    //         <Posts />
    //       </Grid>

    //       <Grid item sm={3.5} sx={{ display: { xs: 'none', sm: 'block' }, justifyContent: 'flex-end' }} >
    //         <SocialMenu />
    //       </Grid>

    //   </Grid> */}
    //   {/* </Container> */}
    // </Box>
  ) : (
    <Typography sx={{ alignItems: 'center', display: 'flex', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center' }}>
      Loading ...
    </Typography>

  );
}
export default Feed;





// import { Container,Box,Grid,Typography } from "@mui/material";
// import React from "react";
// import { useEffect } from "react";
// import Posts from "../components/Posts/Posts";
// import NavBar from "../components/NavBar";
// import SocialMenu from "../components/SocialMenu";
// import ActiviyMenu from "../components/ActivityMenu";
// import Form from "../components/Form/Form";
// import People from "../components/People/People";

// function Friends() {
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/login";
//     }
//   }, []);
//   return localStorage.getItem("token") ?(
//     <Box>
//       <NavBar/>
//       <Box sx={{height:{md:'20px',sm:'80px',xs:'70px'}}}></Box>
//         <Container maxWidth="xxl" >
//           <Grid container spacing={2}>
            
//             <Grid item sm={3.5} sx={{display:{xs:'none',md:'block'}}}>
//               <ActiviyMenu/>
//             </Grid>
            
//             <Grid item xs={12} md={5} sm={8}>
//              <Typography align="center" variant="h5">Friend Requests</Typography>

//              <Typography align="center" variant="h5">People you may know</Typography>
//              <People/>
//             </Grid>

//             <Grid item sm={3.5} sx={{display:{xs:'none',sm:'block'},justifyContent:'flex-end'}}>
//               <SocialMenu/>
//             </Grid>
          
//           </Grid>
//         </Container>      
//     </Box>
//   ): (
//     <Typography sx={{alignItems:'center',display:'flex',top:0,bottom:0,left:0,right:0,position:'absolute',justifyContent:'center'}}> 
//       Loading ...
//     </Typography>  
    
//   );
// }
// export default Friends;