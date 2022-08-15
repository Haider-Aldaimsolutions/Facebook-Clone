import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

import { Grid, CircularProgress, Link, Avatar, Divider, ListItemButton, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import FriendRequests from '../FriendRequests';

function People() {
  const [allProfiles, setAllProfiles] = useState();
  const [sendertoken, setSendertoken] = useState(localStorage.getItem('token'));
  const [requestStatus, setRequestStatus] = useState([]);
  const [friendStatus, setFriendStatus] = useState('Add Friend');
  const [requesterEmail, setRequesterEmail] = useState(localStorage.getItem('email'));
  const [requester, setRequester] = useState();
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [loading4, setLoading4] = React.useState(false);
  const [loading5, setLoading5] = React.useState(false);

  async function getProfiles() {
    const req = await fetch("http://localhost:1337/api/getAllProfiles", {
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    });
    const data = await req.json();
    setAllProfiles(data.profiles);
    setFriendStatus(data.friendStatus);
    // console.log(data.friendStatus)
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

  async function confirmRequest(recevierEmail) {
    setLoading3(true);
    const req = await fetch("http://localhost:1337/api/confirmRequest", {
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

  async function deleteRequest(recevierEmail) {
    setLoading4(true);

    const req = await fetch("http://localhost:1337/api/deleteRequest", {
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
    setLoading4(false);
  }


  async function removeFriend(recevierEmail) {
    setLoading5(true);
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
    setLoading5(false);
  }


  useEffect(() => {
    getProfiles();
  },[]);
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

                <Grid sx={{ width: '100%' }} key={profile._id} item xs={12} sm={12} >

                  <Box className='friendRequests'>
                    <Box sx={{ p: 1, m: 0, borderRadius: 3, flexDirection: 'column', alignItems: 'center' }} >
                      <Box sx={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-between' }}>

                        <Avatar src={profile.profilePicture} sx={{ width: 60, height: 60 }}></Avatar>
                        <Box sx={{ width: '100%', ml: '3%', }}>
                          <Typography sx={{ color: 'lack', fontWeight: 900, mt: '3%' }}>{profile.firstName + ' ' + profile.lastName}</Typography>
                          <Typography sx={{ color: 'gray', fontSize: '13px', fontWeight: 200, mt: '3%' }}>0 mutual friends</Typography>
                        </Box>
                        {/* {console.log("=================Start=================")}
                        {console.log("friendStatus[index]: ", friendStatus[index])}
                        {console.log("requesterEmail ",requesterEmail)}
                        {console.log("profile.email",profile.email)}
                        {console.log("requesterEmail!=profile.friendRequests[index] ",profile.friends[index] != requesterEmail)} */}
                        
                        {friendStatus[index] != 'Friends' ?
                        
                          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            {
                              profile.friendRequests.map((curr,index)=>(
                                curr != requesterEmail ? (<>
                              <LoadingButton variant="contained" loadingPosition="center" loading={loading1} className='friendsButton1' onClick={() => addFriend(profile.email)} sx={{ display: (friendStatus[index] == 'Add Friend') ? 'flex' : 'none' }}>Add Friend</LoadingButton>
                                
                                </>):(<>
                              <LoadingButton variant="contained" loadingPosition="center" loading={loading2} className='friendsButton1' onClick={() => cancelRequest(profile.email)} sx={{ backgroundColor: 'gray' }}>Cancel</LoadingButton>
                                
                                </>)
                              ))
                            }
                            {/* {profile.friendRequests[index] == requesterEmail || friendStatus[index] == 'Requested' ?
                              <LoadingButton variant="contained" loadingPosition="center" loading={loading2} className='friendsButton1' onClick={() => cancelRequest(profile.email)} sx={{ backgroundColor: 'gray' }}>Cancel</LoadingButton>
                              :
                              <LoadingButton variant="contained" loadingPosition="center" loading={loading1} className='friendsButton1' onClick={() => addFriend(profile.email)} sx={{ display: (friendStatus[index] == 'Add Friend') ? 'flex' : 'none' }}>Add Friend</LoadingButton>
                            } */}
                          </Box>
                          :
                          <Box sx={{ width: '100%', display: 'flex', alignItems: { xs: 'flex-end', sm: 'center' }, justifyContent: 'flex-end', flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Button variant="contained" className='friendsButton' sx={{ ml: 5, backgroundColor: '#eee', color: 'black' }}> Friends </Button>
                            <Button variant="contained" className='friendsButton' loading={loading5} onClick={() => removeFriend(profile.email)}>Remove</Button>
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


// export default function LoadingButtonsTransition() {
//   const [loading, setLoading] = React.useState(true);
//   function handleClick() {
//     setLoading(true);
//   }

//   return (
//     <Box>
//       <FormControlLabel
//         sx={{
//           display: 'block',
//         }}
//         control={
//           <Switch
//             checked={loading}
//             onChange={() => setLoading(!loading)}
//             name="loading"
//             color="primary"
//           />
//         }
//         label="Loading"
//       />
//       <Box sx={{ '& > button': { m: 1 } }}>
//         <LoadingButton
//           size="small"
//           onClick={handleClick}
//           endIcon={<SendIcon />}
//           loading={loading}
//           loadingPosition="end"
//           variant="contained"
//         >
//           Friends 
//         </LoadingButton>
//       </Box>

//     </Box>
//   );
// }
