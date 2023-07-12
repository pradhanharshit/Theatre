import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';


function Banner() {
let [bannerMovie, setBanner] = useState("");
useEffect(function () {
  (function() {
    axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=957b9e7dc7b4c8fb694411321546d31d").then((res)=>{
    setBanner(res.data.results[0]);
    })
  })()
}, [])
  return (
       <>
         {
          bannerMovie === ""? <div className="flex justify-center">
          <Oval
            height="80"
            width="80"
            radius="9"
            color="yellow"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
          </div> :
          <div className="
        h-[55vh]
        md:h-[80vh]
        bg-center
        bg-cover
        flex items-end
        "
        style={{
          backgroundImage:`url(https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path})`
        }}
        >
            <div className=" 
            text-xl 
            md:text-3xl
            text-white
            bg-gray-900
            p-4
            text-center
            bg-opacity-60
            w-full
            ">{bannerMovie.title}</div>
        </div>
        }
       </>
  )
}

export default Banner