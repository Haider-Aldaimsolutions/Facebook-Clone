import React from "react";
import { useEffect, useState } from "react";
import Post from "../components/Posts/Post/Post";
import Form from '../components/Form/Form'
import NavBar from "../components/NavBar";
import { CircularProgress } from "@mui/material";
import { TextField, CardMedia, Box, styled, Stack, Link, Card, ListItemButton, Avatar, Button, Modal, Grid, Model, Typography, Paper, Divider } from '@mui/material';
import FileBase from 'react-file-base64';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


const style = {
  position: 'absolute',
  borderRadius: '10px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Profile = () => {
  const [allPosts, setAllPosts] = useState();
  const [allData, setData] = useState();
  const [picture, setPicture] = useState(localStorage.getItem('profilePicture'));
  const [name, setName] = useState();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [open, setOpen] = React.useState(false);
  const [display, setDisplay] = useState(false);
  // const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const [pictureState, setPictureState] = useState(localStorage.getItem('profilePicture'));
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  var i = -1;
  const Centered = styled(Box)({
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',
  });


  async function setProfilePicture(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/setProfilePicture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pictureState,
        token,
      })
    })
    const data = await response.json()
    if (data.status === 'Profile Updated') {
      localStorage.setItem('profilePicture', pictureState)
      setDisplay(false)
      setPictureState('')
    }
  };


  async function getProfile(id) {
    const req = await fetch("http://localhost:1337/api/getProfile", {
      headers: {
        "x-access-token": localStorage.getItem("id"),
      },
    });
    const data = await req.json();
    setPicture(data.profile.profilePicture)
    setAllPosts(data.posts);
    setData(data);
    setName(data.profile.firstName + " " + data.profile.lastName);
  }


  useEffect(() => {
    getProfile(localStorage.getItem("id"));
  }, []);

  return (

    <Centered sx={{ backgroundColor: 'white' }}>
      <NavBar />
      <Centered
        className="media"
        sx={{
          borderRadius: { sm: 3 },
          backgroundImage: `url(${localStorage.getItem('profilePicture')})`,
          width: { md: "70%", xs: '100%' },
          height: { md: "60vh", sm: '100vh', xs: '40vh' },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
        }}
      >
        <Avatar sx={{ height: 200, width: 200 }} src={localStorage.getItem('profilePicture')}></Avatar>
        <PhotoCameraIcon className='menuButtons' sx={{ cursor: 'pointer', position: 'absolute', ml: 8, mt: 3 }} onClick={() => handleOpen()} />
        <Typography align='center' sx={{ my: 6, }}>{name}</Typography>
      </Centered>
      <Form caller='profile'/>
      {/* Set Profile Pic Model */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: { xs: '80%', sm: 400, }, height: '180px' }}>
          <Typography align='center' variant='h6' fontWeight={800}>Add Profile Picture</Typography>
          <ListItemButton onClick={handleClose} sx={{ position: 'absolute', right: 0, top: 0, p: 1, m: 1, borderRadius: 5 }} >
            <CloseOutlinedIcon />
          </ListItemButton>
          <Divider sx={{ mt: 1 }} />

          <form autoComplete="off" noValidate className='root' onSubmit={setProfilePicture}>
            <Box sx={{ justifyContent: 'row', display: 'flex', mt: 1, }}>
              <PhotoLibraryIcon sx={{ mr: 1, fontSize: 'xx-large', color: 'green' }} />
              <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPictureState(base64)} /></div>
            </Box>
            <Button className='buttonSubmit' variant="contained" color="primary" size="large" fullWidth type="submit" sx={{ mt: '15%', borderRadius: 2 }}>Post</Button>
          </form>

        </Box>
      </Modal>
      {/* Ending Model */}


      {allPosts ?
        <Grid className='container' sx={{ alignItems: "center", flexDirection: 'column', justifyContent: 'center' }} container spacing={3}>
          {allPosts.map((post) => (
            i = i + 1,
            <Grid md={5} sx={{ width: { md: '100%', sm: '80%', xs: '100%' } }} key={post._id} item xs={12} sm={12} >
              <Post post={post} name={name} />
            </Grid>
          ))}
        </Grid>
        : <Box className='circularProgress'> <CircularProgress /></Box>}
        
        <Box sx={{my:10}}>
          <Typography align='center' color='gray' >Joined on {localStorage.getItem('createdAt')}</Typography>
          <Typography align='center' color='gray' >Designed by Haider,</Typography>
          <Typography align='center' color='gray' >Inspired by FaceBook </Typography>
        </Box>
        
    </Centered>
  );
};

export default Profile;
