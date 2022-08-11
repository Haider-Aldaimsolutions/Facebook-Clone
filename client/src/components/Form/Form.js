import React, { useState,  } from 'react';
import { Tooltip,TextField,Box,Stack,Link,Card,ListItemButton, Avatar,Button,Modal,Grid,Model, Typography, Paper, Divider } from '@mui/material';
import FileBase from 'react-file-base64';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const style = {
  position: 'absolute',
  borderRadius:'10px',
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
function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}  sx={{ backgroundColor:'#eee',borderRadius:'25px',color:'black',opacity:'0.5',}} ><strong>Add to Post</strong></Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Thanks</h2>
          <p id="child-modal-description">
            For Adding this post
          </p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
        
      </Modal>
    </React.Fragment>
  );
}

const Form = ({ currentId=0, setCurrentId }) => {
  const [open, setOpen] = React.useState(false);
  const [placeholder,setPlaceholder]=React.useState("What's on your mind, Jano "+localStorage.getItem('userName')+'?');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const[display,setDisplay]=useState(false);
  const[token,setToken]=useState(localStorage.getItem('token'));

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  async function handleSubmit(event) {
    event.preventDefault();
        handleClose()
        const response = await fetch('http://localhost:1337/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postData,
          token,
        })
      })
      const data = await response.json()
      if(data.status==='userRegistered'){
        
        setDisplay(false)
        setPostData({ ...postData, creator:'',title:'',message:',',tags:'',selectedFile:'' })
      }
      console.log(data);
  };

  return (
    <Box sx={{alignItems:"center" ,display:'flex',flexDirection:'column',justifyContent:'center'}}>  
    <Card sx={{backgroundColor:'white',width:'100%',mb:2,p:1.5,borderRadius:'10px'}}>
    <Box sx={{flexDirection:'row',display:'flex',mb:1.5}}>
    <Tooltip title="Upload"><Avatar className='avatar' src={localStorage.getItem('profilePicture')} onClick={()=>setOpen(true)} >H</Avatar></Tooltip>
    <Button onClick={handleOpen} className='inputBtn' sx={{ paddingRight:{md:'20%',sm:'15%',xs:'0'}}} >{placeholder}</Button>
    </Box>
    <Divider/>

      <Box  sx={{justifyContent:'space-between',width:'100%',display:'flex',flexDirection:'row',mt:'4px'}} >
      <ListItemButton onClick={handleOpen} sx={{display:{xs:'none',sm:'flex'},p:1,m:0,borderRadius:3,flexDirection:'row',alignItems:'flex-start'}} >
      <VideoCameraFrontIcon sx={{mt:1,ml:1,color:'red'}}  /><Typography sx={{mt:'7px',ml:'4px'}}>Live vedio</Typography>
      </ListItemButton>
      <ListItemButton onClick={handleOpen} sx={{p:1,m:0,borderRadius:3,flexDirection:'row',alignItems:'flex-start'}} >
      <PhotoLibraryIcon sx={{mt:1,ml:1,color:'green'}} /><Typography sx={{mt:'7px',ml:'4px'}}>Photo/vedio</Typography>
      </ListItemButton>
      <ListItemButton onClick={handleOpen} sx={{p:1,m:0,borderRadius:3,flexDirection:'row',alignItems:'flex-start'}} >
      <SentimentSatisfiedAltIcon sx={{mt:1,ml:1,color:'orange'}} /><Typography sx={{mt:'7px',ml:'4px'}}>Feeling/Activity</Typography>
      </ListItemButton>
      </Box>
    </Card>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width:{xs:'100%',sm:400},height:450 }}>
        <Typography align='center' variant='h6'fontWeight={800}>Create Post</Typography>
        <ListItemButton onClick={handleClose} sx={{position:'absolute',right:0,top:0,p:1,m:1,borderRadius:5}} >
          <CloseOutlinedIcon />
        </ListItemButton>
        <Divider sx={{mx:-10,mt:1}}/>

        <ListItemButton sx={{m:0,p:0,width:'50%'}}>
          <Avatar alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 35, height: 35 }}>H</Avatar>
          <Typography sx={{m:0.8,p:0,color:'black',fontWeight:900}}>Haider Ali</Typography>
        </ListItemButton> 

        <form  autoComplete="off" noValidate className='root' onSubmit={handleSubmit}>
        <TextField name="message" placeholder={placeholder} className='searchBar'  variant="standard"  fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="standard"  placeholder="Tags (coma separated)" sx={{mt:3}} value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} /> 
        <Box sx={{justifyContent:'row',display:'flex',mt:1,}}>
          <PhotoLibraryIcon  sx={{mr:1,fontSize:'xx-large',color:'green'}}/>
          <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        </Box>
        <ChildModal />
        <Button  className='buttonSubmit' variant="contained" color="primary" size="large" fullWidth type="submit"  sx={{mt:'15%',borderRadius:2}}>Post</Button>
        </form>

        </Box>
      </Modal>
    </Box>
  );
};
export default Form;
