import { useContext, useState } from "react";
import {  NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider"; 
import defaultUser from "../../assets/avater.png"
import logo from "../../assets/logo.png"
import cart from "../../assets/cart.png"


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("Sign Out successful");
            }).catch(error => console.log(error.message))
    }

    const isTabActive = (path) => {
        return location.pathname === path;
    }

    return (
        <nav x-data="{ isOpen: false }" className="bg-violet-800 shadow w-full">
            <div className="container px-4 py-2 mx-auto relative">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between  2xl:gap-52">
                        <a href="/">
                            <img className="w-24" src={logo} alt="" />
                        </a>
                        {/*  */}

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button onClick={toggleMenu} type="button" className="text-gray-500 hover:text-green-500 focus:outline-none focus:text-green-500" aria-label="toggle menu">
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                    <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'}`}>
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <NavLink
                                exact
                                to="/"
                                className={`px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 font-semibold text-sm ${isTabActive("/") ? "text-white bg-[#0ABF68]" : "text-green-500"}`}
                            >
                                Home
                            </NavLink>

                            {
                                !user ? <NavLink
                                exact
                                to="/login"
                                className={`px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 font-semibold text-sm ${isTabActive("/login") ? "text-white bg-[#0ABF68]" : "text-green-500"}`}
                            >
                                LogIn
                            </NavLink> : <></>
                            }

                            {/* <NavLink
                                exact
                                to="/signup"
                                className={`px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 font-semibold text-sm ${isTabActive("/signup") ? "text-white bg-[#0ABF68]" : "text-green-500"}`}
                            >
                                SignUp
                            </NavLink> */}

                            {
                                user ? <NavLink
                                exact
                                to="/addProduct"
                                className={`px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 font-semibold text-sm ${isTabActive("/addProduct") ? "text-white bg-[#0ABF68]" : "text-green-500"}`}
                            >
                                Add Product
                            </NavLink> : <></>
                            }

                            {
                                user ? <NavLink
                                exact
                                to={`/myCart`}
                                className={`px-3 py-2 mx-3 mt-2 lg:mt-0 font-semibold ${isTabActive("/brandDetails") ? "text-white bg-[#0ABF68]" : "text-green-500"}`}
                            >
                                <img src={cart} alt="Cart Icon" className="w-10 py-1 " />
                            </NavLink> : <></>
                            }
                        </div>

                        <div className="flex items-center mt-4 lg:mt-0">
                            <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                {
                                    user && <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                        <img src={user?.photoURL ? user.photoURL : defaultUser} className="object-cover w-full h-full" alt="avatar" />
                                    </div>
                                }

                                <h3 className="mx-2 text-green-500 font-bold text-lg">{user?.displayName}</h3>
                            </button>

                            {
                                user && <button onClick={() => handleSignOut()} className="btn btn-accent btn-outline h-10 hidden mx-4 text-green-500 lg:block  hover:bg-green-500 focus:outline-none" aria-label="show notifications">
                                    Logout
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
