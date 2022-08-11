import * as React from 'react';
import { AppBar, IconButton, Box, Toolbar, Avatar, styled, Typography, Button, Stack, MenuItem, Menu, InputBase, Divider, CssBaseline, Link, Tooltip, } from '@mui/material';
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
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import FriendRequests from './FriendRequests';

export default function SocialMenu() {
  const StyledItems = styled(Typography)({
    cursor: 'pointer',
    fontSize: 14,
  });
  const menuItems = [
    { Name: <PeopleIcon className='' />, text: 'Hamza', Link: '/' },
    { Name: <GroupsIcon className='' />, text: 'Alina', Link: '/products' },
    { Name: <StoreIcon className='' />, text: 'Shehbaz', Link: '/protfolio' },
    { Name: <YouTubeIcon className='' />, text: 'Adam', Link: '/blog' },
    { Name: <InboxIcon className='' />, text: 'John', Link: '/' },
    { Name: <DraftsIcon className='' />, text: 'Nasir', Link: '/' },
    { Name: <PeopleIcon className='' />, text: 'Usama', Link: '/' },
    { Name: <PeopleIcon className='' />, text: 'Sehar', Link: '/' },
    { Name: <PeopleIcon className='' />, text: 'Nasir Ali', Link: '/' },
    { Name: <PeopleIcon className='' />, text: 'Kareem', Link: '/' },
  ];
  return (
    <Box sx={{ width: '100%', bgcolor: 'inheret', left: { md: '78%', sm: '70%' } }}>
      <List sx={{ width: { md: '21.5%', sm: '25%' }, bgcolor: 'inheret', m: 0, p: 0 }}>

        <FriendRequests />

        <Box className='birthdayNotifications'>
          <Typography sx={{ color: 'gray', fontWeight: 900, my: 1 }}>Birthdays</Typography>
          <ListItemButton sx={{ p: 1, m: 0, borderRadius: 3, flexDirection: 'column', alignItems: 'flex-start' }} >
            <Stack direction="row" spacing={2} sx={{ my: 0 }}>
              <LinearScaleIcon />
              <Typography ><strong> Salman IIlyas</strong>'s birthday is today</Typography>
            </Stack>
          </ListItemButton>
        </Box>

        <Divider />

        <Box sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <Typography sx={{ color: 'gray', fontWeight: 900 }}>Contacts</Typography>
          <Box sx={{ flexDirection: 'row', display: 'flex', mt: -1, mr: -1 }}>
            <IconButton><Tooltip title="New room"><VideoCameraFrontIcon /></Tooltip></IconButton>
            <IconButton><Tooltip title="Search for a name or group"><SearchOutlinedIcon /></Tooltip></IconButton>
            <IconButton><Tooltip title="Options"><LinearScaleIcon /></Tooltip></IconButton>
          </Box>
        </Box>

        {menuItems.map((item) => (
          <ListItemButton sx={{ paddingY: 0.5, ml: -1, pl: 1, borderRadius: '15px' }}>
            <Avatar alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 28, height: 28 }}> {item.text[0]} </Avatar>
            <Typography sx={{ m: 0.8, p: 0, color: 'black', fontWeight: 500 }}>{item.text}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}