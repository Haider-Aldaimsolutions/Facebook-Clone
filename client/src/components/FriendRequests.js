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

export default function FriendRequests() {
    const [friendRequesters, setFriendRequesters] = useState();
    const [requesterProfile, setRequesterProfile] = useState();
    // const [sendertoken, setSendertoken] = useState(localStorage.getItem('token'));
    // const [requestStatus, setRequestStatus] = useState('Add Friend');
    // const [friendStatus, setFriendStatus] = useState('Add Friend');

    async function getRequests() {
        const req = await fetch("http://localhost:1337/api/getAllRequests", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        });
        const data = await req.json();
        console.log(data.requesterProfile);
        setFriendRequesters(data.friendRequesters);
        setRequesterProfile(data.requesterProfile);
        // setFriendStatus(data.friendStatus);
    }

    async function addFriend(recevierEmail) {

        // const req = await fetch("http://localhost:1337/api/addFriend", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         recevierEmail,
        //         sendertoken,
        //     })
        // });
        // const data = await req.json();
        // if (data.status == 'Request Sent') { setRequestStatus('Requested') }
        // console.log(data);
    }
    useEffect(() => {
        getRequests();
    });

    return (
        <Box sx={{ width: '100%', bgcolor: 'inheret', left: { md: '78%', sm: '70%' } }}>
            <List sx={{ width: '100%', bgcolor: 'inheret', m: 0, p: 0 }}>

                <Box sx={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'gray', fontWeight: 900, mb: 1 }}>Friend requests</Typography>
                    <Link href="#" underline="none">see all</Link>
                </Box>

                {requesterProfile?.map((profile) => (
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
                        <Box sx={{ justifyContent: 'space-between', flexDirection: { md: "row", sm: 'column' }, display: 'flex', my: 1 }} spacing={2} >
                            <Button variant="contained" sx={{ fontWeight: 900, px: 3, m: 0.4, borderRadius: 2 }}>Confirm</Button>
                            <Button sx={{ fontWeight: 900, color: 'black', px: 3, m: 0.4, backgroundColor: '#ddd', borderRadius: 2 }}>Delete</Button>
                        </Box>
                    </ListItemButton>
                ))

                }

                <Divider />
            </List>
        </Box>
    );
}