import React from "react";

import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";



const appRouter = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/send',
    element: <SendMoney />,
  },
]);

function App() {

  return (
    <RouterProvider router={appRouter}/>
  )
}

export default App
