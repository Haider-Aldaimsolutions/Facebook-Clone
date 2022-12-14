import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { List,ListItemText,ListItemIcon, ListItemButton, Box, Typography, Divider } from '@mui/material';
import NavBar from '../components/NavBar';
import ActivityMenu from '../components/ActivityMenu';
import LogoutIcon from '@mui/icons-material/Logout';

function Menu() {
  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("email");
    localStorage.removeItem("createdAt");   
    window.location.href = "/login";
  }
  return (
    <Box sx={{display:{sm:'none'}}}>
      <NavBar />
      <Box sx={{ mt: 15, width: { md: '20%', xs: '100%' }, display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', bgcolor: 'inherit', position: { md: 'fixed', xs: 'bolck' } }}>
        <List sx={{ width: '95%' }}>
          <Typography variant='h5' sx={{ ml: 1 }}>
            Menu
          </Typography>
          <ListItemButton onClick={() => window.location.href = '/profile'} sx={{ gap: 0.5, paddingY: { md: 1, xs: 2 }, mt: -1, ml: { md: -2 }, pl: 1 }}>
            <Avatar src={localStorage.getItem('profilePicture')} className='avatar2'>{localStorage.getItem('userName')[0]}</Avatar>
            <Box>
              <Typography sx={{ ml: 1 }}>{localStorage.getItem('userName')}</Typography>
              <Typography color='gray' sx={{ ml: 1 }}> See your Profile</Typography>
            </Box>
          </ListItemButton>
          <Divider />
        </List>
      </Box>
      <ActivityMenu caller={'menu'}/>
      <ListItemButton onClick={()=>onLogout()} sx={{ pl: 1, backgroundColor: { xs: 'white', md: 'inheret' }, borderRadius: { md: '15px', xs: '10px' } }}>
          <ListItemIcon > <LogoutIcon className='activityButtons' /> </ListItemIcon>
          <ListItemText sx={{ m: -2, p: 0 }} primary='Log out' />
      </ListItemButton>
    </Box>
  );
}
export default Menu;