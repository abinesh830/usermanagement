import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/Home';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Userdashboard from './Components/Userdashboard';
import Privateroute from './Components/Privateroute';

const router=createBrowserRouter([{
  path:'/',
  element:<App/>

},
{
  path:'/signup',
  element:<SignUp/>
},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/home',
  element:(<Privateroute>
    <Home/>
  </Privateroute>)
},{
  path:'userdashboard',
  element:<Userdashboard/>
}])
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>

    
    <RouterProvider router={router} />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
