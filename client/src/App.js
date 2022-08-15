import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUP from './screens/signUp';
import Login from './screens/login';
import Profile from './screens/profile';

import { Box } from '@mui/system';
// import Dashboard from './screens/Dashboard';
import './styles.css'
import Feed from './screens/Feed';
import Menu from './screens/Menu';
import Friends from './screens/Friends';
export default function app() {

  return (
    <Router>
      <Box sx={{ mb: {sm:8,xs:8} }} />
      <Routes>
        <Route exact path="/sign-up" element={<SignUP />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Feed />} />
        <Route exact path="/friends" element={<Friends />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}


// import { Container,Box,Grid } from "@mui/material";
// import React from "react";
// import Posts from "./components/Posts/Posts";
// import Form from "./components/Form/Form";
// import NavBar from './components/NavBar'
// import SocialMenu from "./components/SocialMenu";
// import ActiviyMenu from "./components/ActivityMenu";
// import './styles.css'

// function App() {
//   return (
//     <Box>
//       <NavBar/>
//       <Box sx={{height:{md:'80px',sm:'140px',xs:'130px'}}}></Box>
//         <Container maxWidth="xxl" >
//           <Grid container spacing={2}>
            
//             <Grid item sm={3.5} sx={{display:{xs:'none',md:'block'}}}>
//               <ActiviyMenu/>
//             </Grid>
            
//             <Grid item xs={12} md={5} sm={8}>
//               <Posts/>
//             </Grid>

//             <Grid item sm={3.5} sx={{display:{xs:'none',sm:'block'},justifyContent:'flex-end'}}>
//               <SocialMenu/>
//             </Grid>
          
//           </Grid>
//         </Container>      
//     </Box>
//   );
// }
// export default App;