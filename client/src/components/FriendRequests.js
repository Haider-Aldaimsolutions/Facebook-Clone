import * as React from 'react';
import { useState, useEffect } from 'react';
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

export default function FriendRequests({caller}) {
    const [friendRequesters, setFriendRequesters] = useState();
    const [requesterProfile, setRequesterProfile] = useState();
    const [sendertoken, setSendertoken] = useState(localStorage.getItem('token'));
    const [requestStatus, setRequestStatus] = useState('Add Friend');
    const [friendStatus, setFriendStatus] = useState('Add Friend');
    const [processing, setProcessing] = useState(false);

    async function getRequests() {
        const req = await fetch("http://localhost:1337/api/getAllRequests", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        });
        const data = await req.json();
        setFriendRequesters(data.friendRequesters);
        setRequesterProfile(data.requesterProfile);
        // setFriendStatus(data.friendStatus);
    }
    async function confirmRequest(recevierEmail) {
        setProcessing(true);
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
        setProcessing(false);
      }

      async function deleteRequest(recevierEmail) {
        setProcessing(true);
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
        setProcessing(false);
      }

    useEffect(() => {
        getRequests();
    });

    return (
        <Box sx={{ width: '100%', bgcolor: 'inheret', left: { md: '78%', sm: '70%' } }}>
            <List sx={{ width: '100%', bgcolor: 'inheret', m: 0, p: 0 }}>

                <Box sx={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'gray', fontWeight: 900, mb: 1 }}>Friend requests</Typography>
                    <Link href="/friends" underline="none">see all</Link>
                </Box>

                {requesterProfile?.map((profile) => (
                    <Box sx={{flexDirection:caller==='people'?'row':'column',display:'flex'}}>
                    <ListItemButton sx={{ p: 1, m: 0, borderRadius: 3, flexDirection: 'column', alignItems: 'flex-start' }} >
                        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                            <Avatar
                                src={profile.profilePicture}
                                sx={{ width: 60, height: 60 }}>{profile.firstName[0]}
                            </Avatar>
                            <Box sx={{ width: { md: '200px', xs: '180px' }, ml: '3%', }}>
                                <Typography sx={{ color: 'gray', fontWeight: 900, mt: '3%' }}>{profile.firstName + ' ' + profile.lastName}</Typography>
                                <Typography sx={{ color: 'gray', fontSize: '13px', fontWeight: 200, mt: '3%' }}>0 mutual friends</Typography>
                            </Box>
                        </Box>
                        
                    </ListItemButton>
                        <Box sx={{ justifyContent: 'space-between', flexDirection: { md: "row", sm: 'column' }, display: 'flex', my: 1 }} spacing={2} >
                            <Button variant="contained" className='friendsButton' onClick={() => confirmRequest(profile.email)} sx={{ disable: processing ? 'true' : 'false' }}>Confirm</Button>
                            <Button variant="contained" className='friendsButton' onClick={() => deleteRequest(profile.email)} sx={{ disable: processing ? 'true' : 'false',backgroundColor: 'gray' }}>Delete</Button>
                        </Box>

                    </Box>
                ))

                }

                <Divider />
            </List>
        </Box>
    );
}