import React from 'react'

export default function Footer(){
  return (
    <footer style={{padding:12,textAlign:'center',fontSize:13,opacity:0.8}}>
      © {new Date().getFullYear()} Jantung Demo
    </footer>
  )
}
