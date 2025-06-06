import React from 'react'
import { Navigate } from 'react-router-dom';

const Privateroute = ({children}) => {
    const inloggedin= localStorage.getItem('users');
  return inloggedin ?children:<Navigate to='/login' replace/>
    
  
}

export default Privateroute;
