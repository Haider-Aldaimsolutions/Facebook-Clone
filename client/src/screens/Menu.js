import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { List, ListItemButton, Box, Typography, Divider } from '@mui/material';
import NavBar from '../components/NavBar';
import ActivityMenu from '../components/ActivityMenu';

function Menu() {
  return (
    <Box sx={{display:{sm:'none'}}}>
      <NavBar />
      <Box sx={{ mt: 15, width: { md: '20%', xs: '100%' }, display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', bgcolor: 'inherit', position: { md: 'fixed', xs: 'bolck' } }}>
        <List sx={{ width: '95%' }}>
          <Typography variant='h5' sx={{ ml: 1 }}>
            Menu
          </Typography>
          <ListItemButton onClick={() => window.location.href = '/profile'} sx={{ gap: 0.5, paddingY: { md: 1, xs: 2 }, mt: -1, ml: { md: -2 }, pl: 1 }}>
            <Avatar src="/static/images/avatar/1.jpg" className='avatar2'>H </Avatar>
            <Box>
              <Typography sx={{ ml: 1 }}> Haider Jutt</Typography>
              <Typography color='gray' sx={{ ml: 1 }}> See your Profile</Typography>
            </Box>
          </ListItemButton>
          <Divider />
        </List>
      </Box>
      <ActivityMenu />
    </Box>
  );
}
export default Menu;