import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import Requests from './routes/Request';
import Chat from './routes/Chat';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import React, { useState, useEffect} from 'react'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/Requests",
    element: <Requests />,
    errorElement: <ErrorPage />
  },
  {
    path: "/Chat",
    element: <Chat />,
    errorElement: <ErrorPage />
  }
]);

function App() {
  const [data,setData] = useState([{}])
  useEffect(() =>{
    fetch("http://localhost:5000/members").then(
      res=> res.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    )
  },[])
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;