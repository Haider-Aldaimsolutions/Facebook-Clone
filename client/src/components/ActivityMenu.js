import * as React from 'react';
import { AppBar, IconButton, Box, Toolbar, styled, Typography, MenuItem, Menu, InputBase, Divider, CssBaseline, Grid, Link, } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function ActivityMenu({caller}) {
  const StyledItems = styled(Typography)({
    cursor: 'pointer',
    fontSize: 14,
  });
  const menuItems = [
    { Name: <PeopleIcon className='activityButtons' sx={{ color: 'blue' }} />, text: 'Friends', Link: '/' },
    { Name: <GroupsIcon className='activityButtons' sx={{ color: 'pink' }} />, text: 'Groups', Link: '/products' },
    { Name: <StoreIcon className='activityButtons' sx={{ color: 'gray' }} />, text: 'Marketplace', Link: '/protfolio' },
    { Name: <YouTubeIcon className='activityButtons' sx={{ color: 'red' }} />, text: 'Watch', Link: '/blog' },
    { Name: <InboxIcon className='activityButtons' sx={{ color: 'black' }} />, text: 'Memories', Link: '/' },
    { Name: <DraftsIcon className='activityButtons' sx={{ color: 'red' }} />, text: 'Saved', Link: '/' },
    { Name: <PeopleIcon className='activityButtons' sx={{ color: 'lightcyan' }} />, text: 'Pages', Link: '/' },
    { Name: <PeopleIcon className='activityButtons' sx={{ color: 'aqua' }} />, text: 'Events', Link: '/' },
    { Name: <PeopleIcon className='activityButtons' sx={{ color: 'tan' }} />, text: 'Most recent', Link: '/' },
    { Name: <PeopleIcon className='activityButtons' sx={{ color: 'blue' }} />, text: 'Favourits', Link: '/' },
  ];
  return (
    <Box sx={{ display: {md:'flex',xs:caller=='menu'?'flex':'none'}, justifyContent: "flex-start", alignItems: 'flex-start', flexDirection: 'column', bgcolor: 'inherit', position: { md: 'block', xs: 'bolck' } }}>
      <List sx={{m: 0, p: 0, width:caller=='menu'?'100%':'60%',backgroundColor:'white' }}>
        <ListItemButton sx={{ paddingY: { md: 1, xs: 2 },  pl: 1, backgroundColor: { xs: 'white', md: 'inheret' }, borderRadius: { md: '15px', xs: '10px' } }}>
          <ListItemIcon > <PeopleIcon className='activityButtons' /> </ListItemIcon>
          <ListItemText sx={{ m: -2, p: 0 }} primary='Account' />
        </ListItemButton>
        {menuItems.map((item) => (
          <ListItemButton sx={{ paddingY: 1, my: 1,pl: 1,borderRadius: { md: '15px', xs: '10px' } }}>
            <ListItemIcon > {item.Name} </ListItemIcon>
            <ListItemText sx={{ m: -2, p: 0 }} primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

// export default function ActivityMenu(props) {
//   const StyledItems = styled(Typography)({
//     cursor: 'pointer',
//     fontSize: 14,
//   });
//   const { index, style } = props;

//   const menuItems = [
//     { Name: <PeopleIcon className='activityButtons' sx={{ color: 'blue' }} />, text: 'Friends', Link: '/' },
//     { Name: <GroupsIcon className='activityButtons' sx={{ color: 'pink' }} />, text: 'Groups', Link: '/products' },
//     { Name: <StoreIcon className='activityButtons' sx={{ color: 'gray' }} />, text: 'Marketplace', Link: '/protfolio' },
//     { Name: <YouTubeIcon className='activityButtons' sx={{ color: 'red' }} />, text: 'Watch', Link: '/blog' },
//     { Name: <InboxIcon className='activityButtons' sx={{ color: 'black' }} />, text: 'Memories', Link: '/' },
//     { Name: <DraftsIcon className='activityButtons' sx={{ color: 'red' }} />, text: 'Saved', Link: '/' },
//     { Name: <PeopleIcon className='activityButtons' sx={{ color: 'lightcyan' }} />, text: 'Pages', Link: '/' },
//     { Name: <PeopleIcon className='activityButtons' sx={{ color: 'aqua' }} />, text: 'Events', Link: '/' },
//     { Name: <PeopleIcon className='activityButtons' sx={{ color: 'tan' }} />, text: 'Most recent', Link: '/' },
//     { Name: <PeopleIcon className='activityButtons' sx={{ color: 'blue' }} />, text: 'Favourits', Link: '/' },
//   ];
//   const menu = [
//     'Friends','Friends','Friends','Friends','Friends'
//   ];
//   return (
//     <Grid container spacing={2}>
//       <Grid item sm={12} sx={{position: 'absolute',left:0,top:0,height:'100%',width: '100%' }}>

//       <ListItem style={style} key={index} component="div" disablePadding>
//         <ListItemButton>
//           <ListItem >{menu[index]} {menu[index]} </ListItem>

//         </ListItemButton>
//       </ListItem>

        
//       </Grid>
//     </Grid>
//   );
// }
