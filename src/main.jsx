import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { HotelProvider } from "./context/HotelProvider";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HotelProvider>
        <RouterProvider router={router}/>
      </HotelProvider>
  </React.StrictMode>,
)
