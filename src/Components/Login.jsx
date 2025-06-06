import Box from '@mui/material/Box'
import React, { useRef, useState } from 'react'
import back from '../images/gg2.avif'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import {useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from '@mui/material/Alert';









const Login = () => {
  const navigate=useNavigate();

  const[usererr,setusererr]=useState(false)
  const[passerr,setpasserr]=useState(false)
  const[notify3,setnotify3]=useState(false);
  const[notify4,setnotify4]=useState(false);

  const theme=useTheme();
    const ismobile=useMediaQuery(theme.breakpoints.down('sm'))
    const queryclient=useQueryClient();
    const ref2=useRef();
    const[user,setuser]=useState({
      useremail:'',
      userpassword:''
    })


    function handlechange(event){
      const {name,value}=event.target;
      setuser({...user,[name]:value})

    }


    
    const logserver=async(user)=>{

      const res=await axios.post('http://localhost:5000/logdata',user);
      return res.data;
    }
    const mutation=useMutation({
      mutationKey:['logdata'],
      mutationFn:logserver,
      onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['fetchdata']})

      }
    })

    const loginon=(e)=>{
      e.preventDefault();

      if(user.useremail==='' && user.userpassword===""){
        setpasserr(true)
        setusererr(true)
        setTimeout(()=>{
          setpasserr(false)
        setusererr(false)
          
        },3000)
        return;

      }
      if(user.useremail===''){
        setusererr(true);
        setTimeout(()=>{
        setusererr(false)
          
        },3000)
        return;

      }
      if(user.userpassword===''){
        setpasserr(true);
        setTimeout(()=>{
        setpasserr(false)
          
        },3000)
        return;


      }
      if(ref2.current){
        ref2.current.style.display="none"
      }
      mutation.mutate(user,{
        
        onSuccess:(data)=>{
          alert(data.message);
          setnotify3(true);
          localStorage.setItem('users',JSON.stringify(data.datas));
          setTimeout(()=>{
            navigate('/home')
          setnotify3(true)


          },3000)
           


        },
        onError:(error)=>{
           alert("Failed to create account: " + (error?.response?.data?.message || error.message));
           setnotify4(true)
           setTimeout(()=>{
            setnotify4(false)
            ref2.current.style.display="flex"

           },3000)
        }
        
        
        
      })
      




    }

  return (

      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center' ,height:'100vh',backgroundImage:`url(${back})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <Paper elevation={5} sx={{width:ismobile?'90%':'400px',backgroundColor:'white',height:ismobile?'600px':'650px'}} className='border rounded-5'>
           <Typography variant='h4' component='h6' textAlign='center' gutterBottom className='text-dark my-3 '>
                    Login 

            </Typography>
            <form className='form-control mt-5 '>
              <Box  className='form-group'>
                <TextField label='Email' placeholder='enter your email' className='form-control my-3' name='useremail' value={user.useremail} onChange={handlechange}/>

              </Box>
              {usererr && <p className='text-danger'>please enter valid username</p>}
               <Box  className='form-group'>
                <TextField label='Pssword' placeholder='enter your password' className='form-control my-3' name='userpassword' value={user.userpassword} onChange={handlechange}/>

              </Box>
              {passerr && <p className='text-danger'>please enter valid password</p>}
              <Box className='my-3 d-flex justify-content-center'>
                <Button variant='contained' onClick={loginon} ref={ref2}>Login</Button>
                {notify3 && <Alert variant="filled" severity="success" className='my-4'>Login successfully</Alert>}
                {notify4 && <Alert variant="filled" severity="error">invalid username & password</Alert>}
              </Box>
              <Box>
                <Typography className='my-2'>
                  if you don't account ?<br /> <Button sx={{backgroundColor:'green',color:'white'}} onClick={()=>navigate('/signup')} className='my-4'>CREATE NEW ACCOUNT</Button>
                </Typography>

              </Box>


            </form>

        </Paper>

      </Box>
        

   
        



      
  )
}

export default Login
