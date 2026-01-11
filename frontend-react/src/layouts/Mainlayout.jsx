import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

export default function Mainlayout(){
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <Navbar />
      <main style={{flex:1,padding:20}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
