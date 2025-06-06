import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import back from '../images/back7.avif'

const SignUp = () => {

    const sign=async(users)=>{
        const res=await axios.post('http://localhost:5000/signup',users);
        return res.data;
    }

    const[btn,setbtn]=useState(false)
    const navigate=useNavigate()
    const mutation=useMutation({
        mutationKey:['signup'],
        mutationFn:sign,
    });

    const [users,setusers]=useState({
        username:'',
        useremail:'',
        userpassword:''
    })

    function handlechange(event){

        const{value,name}=event.target;
        setusers({...users,[name]:value})

    }
    const[errname,seterrname]=useState(false)
    const[errpass,seterrpass]=useState(false)
    const[erremail,seterremail]=useState(false)

    const[notify,setnotify]=useState(false)
    const refload=useRef();

    function process(event){
        event.preventDefault();


        // condition check

        if(users.username==='' && users.useremail==='' && users.userpassword===''){
            seterrname(true)
            seterremail(true)
            seterrpass(true);


            setTimeout(()=>{
                seterrname(false)
                seterremail(false)
                seterrpass(false)

            },3000)
            return;
        }
        //   condition 2
         if(users.useremail==='' && users.userpassword===''){
            seterremail(true)
            seterrpass(true);

            setTimeout(()=>{
                seterremail(false)
            seterrpass(false);

            },3000)
            return;
        }
        // conditions3
        
        
        
        // condition 6
        if(users.username ==='' && users.userpassword===''){
            seterrpass(true);
            seterrname(true);
             setTimeout(()=>{
                seterrname(false)
                seterrpass(false)
            },3000)
            return;

        }
        // 
        if(users.username==='' && users.useremail===''){
            seterremail(true);
            seterrname(true)
             setTimeout(()=>{
                seterrname(false)
                seterremail(false)
            },3000)
            return;
        }
        // condition 
        if(users.userpassword===''){
            seterrpass(true);
             setTimeout(()=>{
                seterrpass(false)
            },3000)
            return;

        }

        // condition 5
         if(users.username===''){
            seterrname(true)
              setTimeout(()=>{
                seterrname(false)
            },3000)
            return;
        }
        //  condition 4
        if(users.useremail===''){
            seterremail(true)
              setTimeout(()=>{
                seterremail(false)
            },3000)
            return;
        }


        // BTN LOADING PROCESS

        

    //    END OF LOADING 
      


    
mutation.mutate(users,{
    isloading:()=>{
        setbtn(true)


    },
    
    
    onSuccess:(data)=>{
        alert(data.message)
        


        setbtn(false)
        if(refload.current){
       refload.current.style.display='none'
       setnotify(true)

        }





    //    setInterval(()=>{
    //    navigate('/login')


    //    },5000)
        

    },
   onError: (error) => {
  alert("Failed to create account: " + (error?.response?.data?.message || error.message));
}


})


      
       
       
    }

    const theme=useTheme();
    const ismobile=useMediaQuery(theme.breakpoints.down('sm'))
  return (
        <Box   sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',backgroundImage:`url(${back})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
            <Paper elevation={5} sx={{width:ismobile?'90%':'400px',backgroundColor:'rgba(138, 43, 226, 0.9)',height:ismobile?'600px':'650px'}} className='border rounded-5'>
                     <Typography variant='h4' component='h6' textAlign='center' gutterBottom >
                    SignUp

                </Typography>


              
               
                 <form className='form-control'>
                    <Box className='form-group'>
                        <TextField label="Username" type='text' placeholder='enter your name' className='form-control my-3' name='username' value={users.username} onChange={handlechange}/>

                    </Box>
                    {errname&&<p style={{color:'red'}} className='mb-2'>please enter valid username*</p>}
                    <Box className='form-group'>
                        <TextField label="Email" type='email' placeholder='enter your email' className='form-control my-3' name='useremail' value={users.useremail} onChange={handlechange}/>

                    </Box>
                    {erremail&&<p style={{color:'red'}} className='mb-2'>please enter valid mail*</p>}

                    <Box className='form-group'>
                        <TextField label="Password" type='password' placeholder='enter your password' className='form-control my-3' name='userpassword' value={users.userpassword} onChange={handlechange}/>

                    </Box>
                    {errpass&&<p style={{color:'red'}} className='mb-2'>please enter valid password*</p>}

          
          
        </form>
        <Box sx={{display:'flex',justifyContent:'center'}}>

           <Button onClick={process} variant='contained' ref={refload} disabled={btn} startIcon={!btn&&<PersonAddIcon/>} sx={{width:btn?"200px":'300px'}} className='my-4'>
            {btn?<CircularProgress color='success'/>:"SIGNUP"}
           </Button>
           {notify&& <><Alert variant="filled" severity="success" className='my-4'>
  Account created successfully 
</Alert></>}
        </Box>
        <Typography variant='h8' component='h6' className='my-3 d-flex ms-2'>
            if you already have a account please   <p onClick={()=>navigate('/login')} className='text-danger ms-2 hover-pointer'  style={{ cursor: 'pointer' }}>login?</p>
        </Typography>




            </Paper>

        </Box>
      
  )
}

export default SignUp
