import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Oval } from "react-loader-spinner";
import Pagination from './Pagination';

function Movies() {

  let [movies, setMovies] = useState([]);
  let [pageNum, setPage] = useState(1);
  let [hovered, setHovered] = useState("");
  let [favourites, setFavourites] = useState([]);

  const onPrev = () => {
    if(pageNum > 1) {
      setPage(pageNum - 1);
    }
  }

  const onNext = () => {
      setPage(pageNum + 1);
  }

  let showEmoji = (id) => {
    setHovered(id);
  }

  const addEmoji = (movie) =>{
    if(!favourites.find((m) => m.id === movie.id)){
      const newFav = [...favourites, movie];
    setFavourites([...newFav]);
    // console.log(newFav);
    localStorage.setItem("imdb", JSON.stringify(newFav));
    }
  }

  const removeEmoji = (movie) => {
     const filteredFav = favourites.filter((elem) => {
      return elem.id !== movie.id;
     })
     setFavourites([...filteredFav]);
     localStorage.setItem("imdb", JSON.stringify(filteredFav));
  }

  useEffect(function() {
    (function(){
      axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=957b9e7dc7b4c8fb694411321546d31d&page=" + pageNum).then((res) => {
        setMovies(res.data.results)
        let oldFav = localStorage.getItem("imdb")
        oldFav = JSON.parse(oldFav) || []
        setFavourites([...oldFav])
      })
    })()
}, [pageNum])

  return (
    <div className="mt-10">
        <h3 className="font-bold font text-2xl text-center mb-7">Trending Movies</h3>
        <div className="flex flex-wrap justify-center
        mb-7">
          {
            movies.length === 0? <div className="text-center">
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
            movies.map((movie) => {
              return <div key={movie.id}
               className="
        bg-center
        bg-cover
        w-[160px]
        h-[30vh]
        md:h-[40vh]
        md:w-[180px]
        rounded-xl
        m-6
        hover:scale-110
        duration: 300
        flex items-end
        relative
        "
        style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}
        onMouseOver={()=>{
          showEmoji(movie.id)          
        }}
        onMouseOut={()=>{
          setHovered("");
        }}
        >
          <div className="
            bg-gray-900
            p-2
            rounded-xl
            text-center
            bg-opacity-60
            absolute top-2 right-2
          "
          style={{
            display:hovered===movie.id ? "block" : "none"
          }}
          >
            {
              !favourites.find((m)=> m.id === movie.id) ? 
              <div onClick={() => {
                addEmoji(movie)
              }}>💛</div> :
              <div onClick={() => {
                removeEmoji(movie)
              }}>❌</div>
            }
          </div>
          
          <div className="text-white
            bg-gray-900
            p-2
            rounded-b-xl
            text-center
            bg-opacity-60
            w-full">{movie.title || movie.name}</div>
        </div>
        
            })
          }
        </div>
        <Pagination
            pageNum={pageNum}
            onNext={onNext}
            onPrev={onPrev}
            ></Pagination>
    </div>
  )
}

export default Movies 

