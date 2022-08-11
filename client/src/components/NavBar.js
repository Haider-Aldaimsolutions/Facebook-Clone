import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';

import { AppBar, IconButton, ListItemButton, Box, Toolbar, styled, Typography, MenuItem, Menu, InputBase, Divider, CssBaseline, Link, } from '@mui/material';
import { Facebook, Instagram, Twitter, Menu as MenuImg } from "@mui/icons-material"
import HomeIcon from '@mui/icons-material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LogoutIcon from '@mui/icons-material/Logout';

function NavBar() {
  const [open, setOpen] = React.useState(false);
  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: "space-between",
  });
  const SocialBox = styled(Box)({
    display: "flex",
    cursor: 'pointer',
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',

  });
  const MenuBox = styled(Box)({
    display: 'flex',
  });
  const SearchBox = styled(Box)({
    display: 'flex',
    gap: 5,
  });
  const menuItems = [
    { Name: <HomeOutlinedIcon className='menuButtons' />, Link: '/' },
    { Name: <SubscriptionsOutlinedIcon className='menuButtons' />, Link: '#' },
    { Name: <StorefrontIcon className='menuButtons' />, Link: '#' },
    { Name: <GroupsOutlinedIcon className='menuButtons' />, Link: '/friends' },
    // {Name:<SportsEsportsOutlinedIcon className='menuButtons'/>,Link:'/contact-us'},
    // {Name:<MenuRoundedIcon className='menuButtons'/>,Link:'/contact-us'},

  ];
  const profileItems = [
    { Name: <HomeOutlinedIcon className='profileButtons' />, text: 'Setting & privacy', Link: '/' },
    { Name: <SubscriptionsOutlinedIcon className='profileButtons' />, text: 'Help & support', Link: '/products' },
    { Name: <StorefrontIcon className='profileButtons' />, text: 'Display & accessablity', Link: '/protfolio' },
    { Name: <StorefrontIcon className='profileButtons' />, text: 'Give Feedback', Link: '/protfolio' },
    { Name: <LogoutIcon className='profileButtons' />, text: 'Log Out', Link: '/blog' },
  ];
  const StyledItems = styled(Typography)({
    cursor: 'pointer',
    fontSize: 14,
  });
  function onLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  function goToMenu() {
    window.location.href = "/menu";
  }

  return (

    <div className="App">
      <CssBaseline />
      <AppBar sx={{ backgroundColor: 'white', opacity: 2, position: 'fixed' }}>
        <StyledToolbar sx={{ backgroundColor: '#3b5998', display: { md: 'none' }, alignItems: { xs: 'center' }, justifyContent: 'space-between' }}>
          <PersonIcon />
          <u>
            <SearchBox >
              <SearchOutlinedIcon sx={{ color: 'white', mt: 0.5, }} />
              <InputBase className='searchBar' placeholder="Search Facebook" sx={{ width: 130, color: "black" }} />
            </SearchBox>
          </u>

          <PhotoCameraIcon />

        </StyledToolbar>

        <StyledToolbar sx={{ alignItems: { xs: 'center' }, flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: "center", md: 'space-between' } }}>

          <Box className='leftNav' sx={{ display: { sm: 'none', xs: 'none', md: 'flex' } }}>
            <FacebookRoundedIcon sx={{ color: '#1778F2', fontSize: '50px', mr: 0.5, display: { sm: 'none', xs: 'none', md: 'flex' } }} />
            <SearchBox sx={{ backgroundColor: '#eee', borderRadius: 30, display: { sm: 'none', xs: 'none', md: 'flex' } }}>
              <SearchOutlinedIcon sx={{ color: 'gray', mt: 1.5, }} />
              <InputBase placeholder="Search Facebook" sx={{ color: "black" }} />
            </SearchBox>
          </Box>

          <MenuBox sx={{ gap: { xs: '4vh', sm: '7vh', md: '15vh' } }} >
            {menuItems.map((item) => (
              <StyledItems onClick={() => window.location.href = item.Link} >
                <Link>{item.Name}</Link>
              </StyledItems>
            ))}
            <MenuRoundedIcon className='menuButtons' onClick={() => goToMenu()} sx={{ display: { md: 'none' } }} />
          </MenuBox>

          <SocialBox sx={{ display: { sm: 'none', xs: 'none', md: 'flex' } }}>
            <IconButton><Tooltip title="Menu"><MenuRoundedIcon className='leftButtons' /></Tooltip></IconButton>
            <IconButton><Tooltip title="Games"><SportsEsportsOutlinedIcon className='leftButtons' /></Tooltip></IconButton>
            <IconButton><Tooltip title="Messenger"><SendRoundedIcon className='leftButtons' /></Tooltip></IconButton>
            <IconButton><Tooltip title="Notifications"><NotificationsIcon className='leftButtons' /></Tooltip></IconButton>
            <Tooltip title="Account"><Avatar className='avatar' src={localStorage.getItem('profilePicture')} onClick={() => setOpen(true)} >{localStorage.getItem('userName')[0]}</Avatar></Tooltip>

            {/* <IconButton><Tooltip title="Logout"><LogoutIcon onClick={()=>onLogout() } className='leftButtons'/></Tooltip></IconButton> */}
          </SocialBox>

        </StyledToolbar>


        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={() => setOpen(!open)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ mt: 0.5, ml: -2, display: { xs: 'none', md: 'block' } }}
        >
          <Box sx={{ width: 380, height: "100%", mx: 1, }}>

            <Box className='friendRequests'>

              <ListItemButton sx={{ borderRadius: 3, flexDirection: 'column', alignItems: 'flex-start' }} >
                <Box className='profileData' sx={{ flexDirection: 'row', ml: 0.5, display: 'flex' }}>
                  <Avatar alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    className='avatar'>B
                  </Avatar>
                  <Typography sx={{ fontWeight: 900 }}>Boota Tehseem</Typography>
                </Box>
                <Divider className='divider' />
                <Link href="#" underline="none" sx={{ ml: 1 }}>see all profiles</Link>
                {/* <Typography sx={{color:'gray',fontSize:'13px',fontWeight:200,mt:'3%'}}>See</Typography>           */}
              </ListItemButton>
            </Box>


            {profileItems.map((item, index) => (
              <>
                <Link onClick={item.text == 'Log Out' ? () => onLogout() : {}} to={item.Link} style={{ fontSize: "16px", color: 'black', textDecoration: 'none' }}>
                  <MenuItem sx={{ borderRadius: 3, justifyContent: 'space-between', height: 55, }}><Box className='profileData'>{item.Name}{item.text}</Box><SendRoundedIcon /></MenuItem>
                </Link>
              </>
            ))
            }
          </Box>
        </Menu>


      </AppBar>
    </div>
  );
}
export default NavBar;
