import React from 'react'
import Navbar from '../../Components/Shared/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../../Components/Shared/Footer'


const Root = () => {
    const location = useLocation()

    console.log("Location: ", location.pathname);
    return (
        <div >
            {location.pathname.includes('/login') || location.pathname.includes('/signup') ? <></> : <Navbar></Navbar>}
            <Outlet></Outlet>
            {location.pathname.includes('/login') || location.pathname.includes('/signup') ? <></> : <Footer></Footer>}
        </div>
    )
}

export default Root