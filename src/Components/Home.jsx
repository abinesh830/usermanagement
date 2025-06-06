import React from 'react';
import MapIcon from '@mui/icons-material/Map';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Home() {
  const naviagte=useNavigate()

  const user=JSON.parse(localStorage.getItem('users'));
  const queryclient=useQueryClient();

  
  const logoutstatus=async(id)=>{
    let res=await axios.post(`http://localhost:5000/logout/${id}`);
    return res.data;

  }


  const mutation=useMutation({
        mutationKey:['logout'],
        mutationFn:logoutstatus,
        onSuccess:()=>{
          queryclient.invalidateQueries({queryKey:['fetchdata']})

        }
        ,retry:3,
  })


  function handlelogout(event){
    event.preventDefault();
    mutation.mutate(user.userid,{
      onSuccess:()=>{
        localStorage.removeItem('users');
        naviagte('/login')

      }
    })


  }
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom className='d-flex justify-content-between'>
        <Box>
           <MapIcon /> Map View

        </Box>
         <Button sx={{backgroundColor:'red',color:'white'}} onClick={handlelogout}>Logout</Button>
       
      </Typography>
      <Box sx={{ width: '100%', height: '80vh' }}>
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-74.25987571760744!3d40.69767006358627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b60165%3A0x8b621f8a7a7d28a4!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1633452834502!5m2!1sen!2s"
        ></iframe>
      </Box>
    </Box>
  );
}

export default Home;
