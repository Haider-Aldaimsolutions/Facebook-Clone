import React from "react";
import { useEffect, useState } from "react";
import Post from "../components/Posts/Post/Post";
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
  const [picture, setPicture] = useState();
  const [name, setName] = useState();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [open, setOpen] = React.useState(false);
  const [display, setDisplay] = useState(false);
  // const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const [pictureState, setPictureState] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  var i = -1;
  const Centered = styled(Box)({
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',
  });


  async function setProfilePicture() {
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
    console.log(data);
  };


  async function getProfile(id) {
    const req = await fetch("http://localhost:1337/api/getProfile", {
      headers: {
        "x-access-token": localStorage.getItem("id"),
      },
    });
    const data = await req.json();
    console.log(data.profile.profilePicture)
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
          backgroundImage: `url(${picture})`,
          width: { md: "70%", xs: '100%' },
          height: { md: "60vh", sm: '100vh', xs: '40vh' },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
        }}
      >
        <Avatar sx={{ height: 200, width: 200 }} src={picture}></Avatar>
        {/* <CardMedia sx={{width:'100px',height:'100px'}}  image={picture}  />   */}
        <PhotoCameraIcon className='menuButtons' sx={{ cursor: 'pointer', position: 'absolute', ml: 8, mt: 3 }} onClick={() => handleOpen()} />
        <Typography align='center' sx={{ my: 6, }}>{name}</Typography>
      </Centered>
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

          {/* <ListItemButton sx={{m:0,p:0,width:'50%'}}>
          <Avatar alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 35, height: 35 }}>H</Avatar>
          <Typography sx={{m:0.8,p:0,color:'black',fontWeight:900}}>Haider Ali</Typography>
        </ListItemButton>  */}

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
    </Centered>
  );
};

export default Profile;

  //     post?
  //     <Card className="card" >
  //     <CardMedia className='media' style={{paddingTop: '100%',}} image={post.selectedFile} title={post.title} />
  //     <div className='overlay'>
  //       <Typography variant="h6">{name}</Typography>
  //       <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
  //     </div>
  //     <div className='overlay2'>
  //       <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
  //     </div>
  //     <div className='details'>
  //       <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
  //     </div>
  //     <Typography className='title' gutterBottom variant="h5" component="h2">{post.title}</Typography>
  //     <CardContent>
  //       <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
  //     </CardContent>
  //     <CardActions className='cardActions'>
  //       <Button size="small" color="primary" onClick={() => likePost(post._id,post.likeCount+1)}><ThumbUpIcon fontSize="small" /> Like {post.likeCount} </Button>
  //       <Button size="small" color="primary" onClick={() => deletePost(post._id)}><DeleteIcon fontSize="small" /> Delete</Button>
  //     </CardActions>
  //    </Card>
  //     :<></>
  //   );
