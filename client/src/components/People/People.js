import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, CircularProgress, Link, Avatar, Divider, ListItemButton, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import FriendRequests from '../FriendRequests';

function People() {
  const [allProfiles, setAllProfiles] = useState();
  const [sendertoken, setSendertoken] = useState(localStorage.getItem('token'));
  const [requesterEmail, setRequesterEmail] = useState(localStorage.getItem('email'));
  const [requester, setRequester] = useState();
 
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [refresh, setRefresh] = useState(true);

  async function getProfiles() {
    const req = await fetch("http://localhost:1337/api/getAllProfiles", {
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    });
    const data = await req.json();
    setAllProfiles(data.profiles);
    setRequester(data.requester);
  }

  async function addFriend(recevierEmail) {

    setLoading1(true);
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
    setLoading1(false);
  }

  async function cancelRequest(recevierEmail) {
    setLoading2(true);
    const req = await fetch("http://localhost:1337/api/cancelRequest", {
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
    setLoading2(false);
  }

  async function removeFriend(recevierEmail) {
    setLoading3(true);
    const req = await fetch("http://localhost:1337/api/removeFriend", {
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
    setLoading3(false);
  }

  const timer = setTimeout(() => {
    setRefresh(!refresh)
  }, 10000);

  useEffect(() => {
    getProfiles();
  },[refresh,loading1,loading2,loading3]);
  return (

    allProfiles ?
      !allProfiles.length ?
        <>
          <Typography align="center" color='gray' variant="h5">Friend Requests</Typography>
          <Divider />
          <FriendRequests caller={'people'} />
          <Typography align="center" color='gray' sx={{ my: 2 }} variant="h5">People you may know</Typography>
          <Divider />
          <Typography align="center" color='gray' sx={{ my: 2 }} variant="h5">None to show</Typography>
        </> : (
          <Box sx={{ width: '100%' }}>
            <Typography align="center" color='gray' variant="h5">Friend Requests</Typography>
            <Divider />
            <FriendRequests caller={'people'} />
            <Typography align="center" color='gray' sx={{ my: 2 }} variant="h5">People you may know</Typography>
            <Divider />
            <Grid className='container' sx={{ alignItems: "center", flexDirection: 'column', justifyContent: 'center' }} container spacing={2}>

              {allProfiles.map((profile, index) => (
                // status='',
                // isFriend='',
                <Grid sx={{ width: '100%' }} key={profile._id} item xs={12} sm={12} >

                  <Box className='friendRequests'>
                    <Box sx={{ p: 1, m: 0, borderRadius: 3, flexDirection: 'column', alignItems: 'center' }} >
                      <Box sx={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Avatar src={profile.profilePicture} sx={{ width: 60, height: 60 }}></Avatar>
                        <Box sx={{ width: '100%', ml: '3%', }}>
                          <Typography sx={{ color: 'lack', fontWeight: 900, mt: '3%' }}>{profile.firstName + ' ' + profile.lastName}</Typography>
                          <Typography sx={{ color: 'gray', fontSize: '13px', fontWeight: 200, mt: '3%' }}>0 mutual friends</Typography>
                        </Box>
                        {profile.friends.find((curr)=>curr == requesterEmail) ?
                          <Box  sx={{ width: '100%', display: 'flex', alignItems: { xs: 'flex-end', sm: 'center' }, justifyContent: 'flex-end', flexDirection: { xs: 'column', sm: 'row' } }}>
                          <LoadingButton  variant="contained" className='friendsButton' sx={{ ml: 5, backgroundColor: '#eee', color: 'black' }}> Friends </LoadingButton>
                          <LoadingButton variant="contained" className='friendsButton' loading={loading3} onClick={() => removeFriend(profile.email)}>Remove</LoadingButton>
                          </Box>
                          :
                          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                          {
                           profile.friendRequests.find((curr)=>curr == requesterEmail)?
                           <><LoadingButton variant="contained" loadingPosition="center" loading={loading2} className='friendsButton1' onClick={() => cancelRequest(profile.email)} sx={{ backgroundColor: 'gray' }}>Cancel</LoadingButton></>
                           :<><LoadingButton variant="contained" loadingPosition="center" loading={loading1} className='friendsButton1' onClick={() => addFriend(profile.email)} sx={{  }}>Add Friend</LoadingButton></>
                          }
                         </Box>
                        }
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      :
      <></>
  );
}
export default People