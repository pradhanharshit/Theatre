import React from 'react'
import Logo from "../popcorn.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="
      border
      flex items-center
      space-x-8
      pl-12 py-4
    ">
        <img className="h-20 w-25
         
        " src={Logo} alt=""/>
        <Link to="/"
        className="font-bold text-xl p-2 hover:bg-amber-400 rounded-xl"
        
        >Movies</Link>
        <Link to="/fav"
        className="font-bold text-xl p-2 hover:bg-amber-400 rounded-xl"
        >Favourites</Link>
    </div>
  )
}

export default NavBar