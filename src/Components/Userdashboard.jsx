import React, { useState,useRef}  from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import bs from '../images/bs.avif'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import logo from '../images/logo-white.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TextField from '@mui/material/TextField'

import Avatar from '@mui/material/Avatar'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ava from '../images/ava.avif'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {useReactTable,createColumnHelper,flexRender,getCoreRowModel, getFilteredRowModel} from '@tanstack/react-table'
import Badge from '@mui/material/Badge'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2'
import Pagination from '@mui/material/Pagination'
import Modal from '@mui/material/Modal'









const columnhelper=createColumnHelper()

   





const Userdashboard = () => {

    const btn1=useRef();
    const queryclient=useQueryClient();

 const theme=useTheme();
   let ismobile=useMediaQuery(theme.breakpoints.down('sm'))
    
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:ismobile?300:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




    
// created account add account
 const[errname1,seterrname1]=useState(false)
const[errpass1,seterrpass1]=useState(false)
const[erremail1,seterremail1]=useState(false)
const[errroll,seterrroll]=useState(false)
    const[notify1,setnotify1]=useState(false)



const signupnew=async()=>{

    const res=await axios.post('http://localhost:5000/newusers',newuser);
    return res.data;

}

const mutation=useMutation({
    mutationKey:['newusers'],
    mutationFn:signupnew,
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['fetchdata']})
    }

});



const[newuser,setnewuser]=useState({
    newusername:'',
    newuseremail:'',
    newuserpassword:'',
    newuserroll:''
})
const handlenew=(event)=>{
  const {name,value}= event.target;

  setnewuser({...newuser,[name]:value})

}
function createprocess(event){
    event.preventDefault();


 if(newuser.newusername==='' && newuser.newuseremail==='' && newuser.newuserpassword==='' && newuser.newuserroll===''){
            seterremail1(true)
            seterrname1(true)
            seterrpass1(true);
            seterrroll(true)


            setTimeout(()=>{
                seterrname1(false)
                seterremail1(false)
                seterrpass1(false)
                seterrroll(false)

            },3000)
            return;
        }
        //   condition 2
         if(newuser.newuseremail==='' && newuser.newuserpassword==='' &&newuser.newuserroll===''){
            seterremail1(true)
            seterrpass1(true)
            seterrroll(true)

            setTimeout(()=>{
                seterremail1(false)
            seterrpass1(false);
            seterrroll(false)


            },3000)
            return;
        }
        // conditions3
        
        
        
        // condition 6
        if(newuser.newusername ==='' && newuser.newuserpassword==='' && newuser.newuserroll){
            seterrpass1(true);
            seterrname1(true);
            seterrroll(true)

             setTimeout(()=>{
                seterrname1(false)
                seterrpass1(false)
            seterrroll(false)

            },3000)
            return;

        }
        // 
        if(newuser.newusername==='' && newuser.newuseremail==='' && newuser.newuserroll){
            seterremail1(true);
            seterrname1(true)
            seterrroll(true)

             setTimeout(()=>{
                seterrname1(false)
                seterremail1(false)
            seterrroll(false)

            },3000)
            return;
        }
        if(newuser.newuserpassword==='' && newuser.newuserroll===''){
            seterrpass1(true);
            seterrroll(true);

              setTimeout(()=>{
                seterrpass1(false)
            seterrroll(false)

            },3000)

        }
        // condition 
        if(newuser.newuserpassword===''){
            seterrpass1(true);
             setTimeout(()=>{
                seterrpass1(false)
            },3000)
            return;

        }

        // condition 5
         if(newuser.newusername===''){
            seterrname1(true)
              setTimeout(()=>{
                seterrname1(false)
            },3000)
            return;
        }
        //  condition 4
        if(newuser.newuseremail===''){
            seterremail1(true)
              setTimeout(()=>{
                seterremail1(false)
            },3000)
            return;
        }
        if(newuser.newuserroll===""){
            seterrroll(true)
             setTimeout(()=>{
                seterrroll(false)
            },3000)
            return;
        }

        mutation.mutate(newuser,{
            onSuccess:(data)=>{
                if(btn1.current){
                    btn1.current.style.display='none';
                    setnotify1(true)
                    alert(data.message)
                    setTimeout(()=>{
                        setnotify1(false)
                        handleClose()

                    },2000)
                }

            },
             onError: (error) => {
    if (error.response && error.response.status === 409) {
      alert(error.response.data.message || "User already exists");
    } else {
      alert('An unexpected error occurred.');
    }
  }

})







}








    const[ismodelOpen,setismodelOpen]=React.useState(false)
     const handleOpen = () => setismodelOpen(true);
     const handleClose = () => setismodelOpen(false);

    //  edit modal open 
    const [editUser, setEditUser] = React.useState(null);
    const [editModel, setEditModel] = React.useState(false);
    const [editUsererr,setEditUsererr]=useState(false)
    const[updateno,setUpdateno]=useState(false)


const editModelOpen = (user) => {
  setEditUser(user);
  setEditModel(true);
};

const editModelClose = () => {
  setEditModel(false);
  setEditUser(null);
};

    // edit user handlechange
    const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditUser((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// edit change functions 
const edit=async(editUser)=>{
    const res=await axios.put('http://localhost:5000/editdata',editUser);
    return res.data

}
const mutationedit=useMutation({
    mutationKey:['editdata'],
    mutationFn:edit,
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['fetchdata']})
    },
    onError:(error)=>{
        alert("this error  is "+error.message)

    }
})

const savechange = (e) => {
  e.preventDefault();

  if (!editUser?.username || !editUser?.useremail || !editUser?.userroll) {
    alert("All fields are required.");
    return;
  }

  mutationedit.mutate(editUser,{
    onSuccess:(data)=>{
        alert(data.message)
        setUpdateno(true)
        setTimeout(()=>{
        setUpdateno(false)

            setEditModel(false); // Close modal after saving

        },3000)

    }
  });  // Trigger mutation

  
};



   const [globalFilter, setGlobalFilter] = useState('');


const [pageIndex, setPageIndex] = useState(0);
const [pageSize, setPageSize] = useState(5);

    const deleteuser=async(id)=>{
        const res=await axios.delete(`http://localhost:5000/deleteuser/${id}`);
        return res.data;

    }
    
    
const {mutate}=useMutation({
    mutationKey:['deleteuser'],
    mutationFn:deleteuser,
    onSuccess:()=>{queryclient.invalidateQueries({queryKey:['fetchdata']})}
    

})


   
// delete user


 function handledelete(id){

        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    mutate(id,{
        onSuccess:()=>{
             Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });

        }
    
    })
    
   
  }
});
    }






// delete end


    const fetchdata=async({queryKey})=>{
          const [_key, { pageIndex, pageSize, search }] = queryKey;

        const res = await axios.get(`http://localhost:5000/fetchdata`,{
            params: {
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? 5,
      search: search ?? '',
    },
        });
        return res.data;
    }

   

   const {data,isLoading,isError,isFetching}=useQuery({
    queryKey:['fetchdata',{ pageIndex, pageSize, search: globalFilter }],
    queryFn:fetchdata,
    placeholderData:keepPreviousData(),
    refetchInterval:1000,
    
    
    

   })

   const columns=[
    columnhelper.accessor('userid',{
        cell:(info)=>(
            <span>
            {info.getValue()}


            </span>
        ),
        header:()=>(
            <span className='d-flex justify-content-center'>
                ID

            </span>
        )
        
    }),
    columnhelper.accessor('username',{
        cell:(info)=>info.getValue(),
        header:()=>(
            <span className='d-flex justify-content-center'>
                NAME
            </span>
        )
    }),
    columnhelper.accessor('useremail',{
        cell:(info)=>info.getValue(),
        header:()=>(
            <span className='d-flex justify-content-center'>
                EMAIL
            </span>
        )
    }),
    columnhelper.accessor('userpassword',{
        cell:(info)=>info.getValue(),
        header:()=>(
            <span className='d-flex justify-content-center'>
                PASSWORD

            </span>
        )
    }),
    columnhelper.accessor('userroll',{
        cell:(info)=>(
            <span>
                {info.getValue()==='ADMIN'?(<p className='bg-danger text-white text-center border rounded-5'>{info.getValue()}</p>):(<p className='bg-success text-white text-center border rounded-5'>{info.getValue()}</p>)}
            </span>
        ),
        header:()=>(
            <span className=''>
                ROLL

            </span>
        )
    }),
    columnhelper.accessor('userstatus',{
        cell:(info)=>(
            <span>
                {info.getValue()===1?<Switch color='success' checked={info.getValue}/>:<Switch  checked={!info.getValue}/>}
                
            </span>
        ),
        header:()=>(
            <span >
                STATUS
            </span>
        )
    }),
    columnhelper.accessor('MANAGEMENT',{
        cell:({row})=>(
            <div className='d-flex justify-content-center'>
                <EditIcon onClick={() => editModelOpen(row.original)} style={{ cursor: 'pointer' }} />
                <DeleteIcon className='mx-3 text-danger' onClick={()=>handledelete(row.original.userid)} />


            </div>
                


        )
    })
   ]

  

   

const table = useReactTable({
  data: data?.users ?? [],
  columns: columns,
  state: {
    globalFilter,
    pagination:{pageIndex,pageSize},
  },
  manualPagination:true,
  pageCount:data?.totalPages || 1,
  onPaginationChange:(updater)=>{
    const newState=typeof updater==='function' ? updater({pageIndex,pageSize}):updater;
     setPageIndex(newState.pageIndex);
    setPageSize(newState.pageSize);

  },
  onGlobalFilterChange: setGlobalFilter,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
});


   

   
   

  


    


  return (
    <div style={{backgroundImage:`url(${bs})`,height:'100vh',width:'100%',backgroundSize:'cover',overflowX:'auto'}}>
        {isLoading &&<h1 className='text-white text-center'>loading...</h1>}
        {isError && <h1 className='text-white text-center'>loading error</h1>}
       <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Box>
            <img src={logo} alt="" style={{color:'white',width:'200px'}} className='mx-3' />
            

        </Box>
        <Box sx={{display:ismobile?'block':'none'}}>
            <DensityMediumIcon className='my-3 me-3 text-white'/>

        </Box>
        <Box sx={{display:ismobile?'none':'flex',justifyContent:'space-between'}}>
            <Typography className='text-primary mx-3 my-4' noWrap={ismobile?true:false}>
                <DashboardIcon className='mx-1 text-white'/>
                Management users


            </Typography>
            <Typography className='text-white mx-3 my-4'>
                <HomeIcon className='mx-1'/>
                Home


            </Typography>
             <Typography className='text-white mx-3 my-4'>
                <MailIcon className='mx-1'/>
                Notification


            </Typography>
            <Avatar  src={ava} className='mx-3 my-3'/>





        </Box>

       </Box>
       <Box component='div' className='mx-5 my-3' sx={{display:'flex',justifyContent:'end'}}  >

        {/* search bar */}
<Paper
  component="form"
  sx={{
    display: 'flex',
    alignItems: 'center',
    width: ismobile ? 250 : 400,
    px: 1,
    py: 0.5,
    backgroundColor: 'white',
    borderRadius: 3,
    boxShadow: 3,
    ml: 2,
    marginRight:ismobile?"0px":"50px"
  }}
  elevation={0}
>
  <InputBase
    sx={{ ml: 1, flex: 1 }}
    placeholder="Search users"
    inputProps={{ 'aria-label': 'search users' }}
    value={globalFilter ?? ''}
    onChange={(e) => setGlobalFilter(e.target.value)}
  />
  <IconButton type="button" sx={{ p: '6px' }} aria-label="search">
    <SearchIcon />
  </IconButton>
</Paper>

{/* search bar end */}
<Button variant='contained' startIcon={<AddIcon/>} sx={{marginLeft:ismobile?'20px':'0px'}} onClick={handleOpen}>Add User</Button>


            








       </Box>
       <Box   sx={{
    overflowX: 'auto',
    '& tbody tr:hover': {
      backgroundColor:'black', 
      color: 'white', 
      cursor:'pointer'  
    },
  }}>
        

        <table border={3} className=' container table table-hover table-bordered' style={{ minWidth: '600px' }}>
            <thead >
                {table.getHeaderGroups().map(headerGroup=>(
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header=>(
                            <td key={header.id} className='text-white bg-primary'>
                                <div>
                                    {flexRender(header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </div>

                            </td>
                        ))}

                    </tr>
                ))}

            </thead>
            <tbody>
                {table.getRowModel().rows.map((row)=>(
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell)=>(
                            <td key={cell.id} className='text-white bg-transparent'>
                                {flexRender(cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                

                            </td>
                            
                        ))}


                    </tr>
                ))}

            </tbody>

        </table>
        <Box className='container d-flex justify-content-between w-100 d-sm-flex'>
            <Box>
                 <span className=' container ms-2  text-white'>users per page</span>
            <select  value={table.getState().pagination.pageSize}  onChange={(e) => table.setPageSize(Number(e.target.value))}>
                {[5,10,15,20].map((page)=>(<option key={page} value={page}>
                    {page}

                </option>))}

            </select>

            </Box>
            <Box>
                <Pagination count={data?.totalPages} page={table.getState().pagination.pageIndex+1} onChange={(e, page) => table.setPageIndex(page - 1)} variant="outlined" shape="rounded" color='primary'   sx={{
    color: 'white',
    '& .MuiPaginationItem-root': {
      color: 'white',
      borderColor: 'white',
    }
  }}/>

            </Box>
           

        </Box>


        
      

      

       </Box>


       {/* add user modal */}



        <Modal
        open={ismodelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
             <Box className='d-flex justify-content-end' sx={{position:'relative',bottom:'30px',left:'30px'}}>
                    <CloseIcon className='text-white bg-danger' onClick={handleClose}/>
                </Box>
                
            <Paper>
               
                <Typography sx={{color:'white',textAlign:'center',backgroundColor:'green' }} className='mb-3'>
                    Create account 
                </Typography>
                <form className='mx-3'>
                    <Box className='form-group'>
                        <TextField label='Name' className='form-control' name='newusername' value={newuser.newusername} onChange={handlenew} type='text' placeholder='enetr your name'/>

                    </Box>
                    {errname1 && <p className='text-danger'>please enter valid name*</p>}
                    <Box className='form-group my-3'>
                        <TextField label='Email' className='form-control'  name='newuseremail' value={newuser.newuseremail} onChange={handlenew} type='text' placeholder='enetr your email'/>

                    </Box>
                    {erremail1 && <p className='text-danger'>please enter valid email*</p>}

                    <Box className='form-group my-3'>
                        <TextField label='Password' className='form-control' name='newuserpassword' value={newuser.newuserpassword} onChange={handlenew} type='text' placeholder='enetr your password'/>

                    </Box>
                    {errpass1 && <p className='text-danger'>please enter valid password*</p>}

                     <Box className='form-group my-3'>
                        <select className='form-control' name='newuserroll' value={newuser.newuserroll} onChange={handlenew}>
                            <option value="">select type of Roll</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>

                        </select>

                    </Box>
                    {errroll && <p className='text-danger'>please select valid roll</p>}
                    <Box className='d-flex justify-content-center'>
                    <Button variant='contained' ref={btn1} className='my-3  ' onClick={createprocess}>Sign Up</Button>
                    {notify1 && <Alert variant="filled" severity="success" className='my-4'>Account created successfully </Alert>}



                    </Box>
                    


                </form>
            </Paper>
          

        </Box>
      </Modal>



      {/* editing model */}


<Modal open={editModel}>
  <Box sx={style}>
    <Paper>
      <Typography
        sx={{ color: 'white', textAlign: 'center', backgroundColor: 'green' }}
        className='mb-3'
      >
        Edit User
      </Typography>

      <form className='mx-3' onSubmit={savechange}>
        <TextField
          label='Name'
          name='username'
          value={editUser?.username || ''}
          onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
          fullWidth
          margin='normal'
        />

        <TextField
          label='Email'
          name='useremail'
          value={editUser?.useremail || ''}
          onChange={(e) => setEditUser({ ...editUser, useremail: e.target.value })}
          fullWidth
          margin='normal'
        />

        <select
          className='form-control my-3'
          name='userroll'
          value={editUser?.userroll || ''}
          onChange={(e) => setEditUser({ ...editUser, userroll: e.target.value })}
        >
          <option value=''>Select role</option>
          <option value='ADMIN'>ADMIN</option>
          <option value='USER'>USER</option>
        </select>

        <Box className='d-flex justify-content-between'>
          <Button
            variant='contained'
            type='submit'
            sx={{ backgroundColor: 'green', color: 'white' }}
          >
            Save Changes
          </Button>

          <Button
            variant='contained'
            onClick={editModelClose}
            sx={{ backgroundColor: 'red', color: 'white' }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
     {updateno && <Alert variant="filled" severity="success" className='my-4'>Updated successfully </Alert>}

  </Box>
</Modal>














      {/* edit model end */}



       

      
    </div>
  )
}


export default Userdashboard ;
