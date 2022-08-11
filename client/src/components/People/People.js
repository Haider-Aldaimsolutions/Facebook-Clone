import { Grid, CircularProgress, Link, Avatar, ListItemButton, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
// import Form from '../Form/Form';
// import Post from "./Post/Post";
// import DraftsIcon from '@mui/icons-material/Drafts';

function People() {
  const [allProfiles, setAllProfiles] = useState();
  const [sendertoken, setSendertoken] = useState(localStorage.getItem('token'));
  const [requestStatus, setRequestStatus] = useState('Add Friend');
  const [friendStatus, setFriendStatus] = useState('Add Friend');

  async function getProfiles() {
    const req = await fetch("http://localhost:1337/api/getAllProfiles", {
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    });
    const data = await req.json();
    console.log(data.friendStatus);
    setAllProfiles(data.profiles);
    setFriendStatus(data.friendStatus);

  }

  async function addFriend(recevierEmail) {

    const req = await fetch("http://localhost:1337/api/addFriend", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recevierEmail,
        sendertoken,
      })
    });
    const data = await req.json();
    if (data.status == 'Request Sent') { setRequestStatus('Requested') }
    console.log(data);
  }

  useEffect(() => {
    getProfiles();
  });

  return (
    allProfiles ?
      !allProfiles.length ? <Box className='circularProgress'> <CircularProgress /></Box> : (
        <>
          <Grid className='container' sx={{ alignItems: "center", flexDirection: 'column', justifyContent: 'center' }} container spacing={2}>
            {allProfiles.map((profile) => (
              <Grid sx={{ width: { md: '100%', sm: '80%', xs: '100%' } }} key={profile._id} item xs={12} sm={12} >

                <Box className='friendRequests'>
                  <Box sx={{ p: 1, m: 0, borderRadius: 3, flexDirection: 'column', alignItems: 'center' }} >
                    <Box sx={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between' }}>

                      <Avatar src={profile.profilePicture} sx={{ width: 60, height: 60 }}></Avatar>
                      <Box sx={{ width: '100%', ml: '3%', }}>
                        <Typography sx={{ color: 'lack', fontWeight: 900, mt: '3%' }}>{profile.firstName + ' ' + profile.lastName}</Typography>
                        <Typography sx={{ color: 'gray', fontSize: '13px', fontWeight: 200, mt: '3%' }}>0 mutual friends</Typography>
                      </Box>
                      <Button variant="contained" onClick={() => addFriend(profile.email)} sx={{ fontWeight: 900, width: '50%', height: '50px', m: 0, p: 0, borderRadius: 2 }}>{friendStatus ? 'Requested' : 'Add Friend'} </Button>

                    </Box>
                  </Box>
                </Box>

              </Grid>
            ))}
          </Grid>
        </>
      )
      : <></>
  );
}

export default People