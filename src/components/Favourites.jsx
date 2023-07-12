import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import up from "./favpng_arrow-down-arrow-up-right-left-up-clip-art.png";
import down from "./favpng_arrow-down-font-awesome.png";


function Favourites() {
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary',
    18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History',
    27: 'Horror',
    10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller',
    10752: 'War',
    37: 'Western',
    10765: ' Sci-Fi & Fantasy',
    10759: ' Action & Adventure'
  }

  const removeEmoji = (movie) => {
    const filteredFav = favourites.filter((elem) => {
     return elem.id !== movie.id;
    })
    setFavourites([...filteredFav]);
    localStorage.setItem("imdb", JSON.stringify(filteredFav));
 }
  // this useEffect is to get data stored in local storage
  useEffect(() => {
    let oldFav = localStorage.getItem("imdb")
    oldFav = JSON.parse(oldFav) || []
    // console.log(oldFav)
    setFavourites([...oldFav])
  }, [])
  // {console.log(favourites)}
  //using another useEffect to get buttons of grouping feature ie to get genres
  
  useEffect(()=>{
    let temp = [];
    for(let i = 0; i < favourites.length; i++) {
      let movie = favourites[i];
      let arr = movie.genre_ids;
      let tempp = arr.map((gid) => genreids[gid])
      temp = [...temp, ...tempp]
      }
      temp = temp.filter((item, index)=> temp.indexOf(item) === index)
      temp.sort()
      setGenres(["All Genres", ...temp])
   
  }, [favourites])


  let filteredFavourites = currGenre === "All Genres" ? 
  favourites :
  favourites.filter((movie)=>{
    for(let i = 0; i < movie.genre_ids.length; i++){
      if(genreids[movie.genre_ids[i]] === currGenre){
        return (movie)
      }
    }
  })

  //sorting 
  if(popularity === 1){
    filteredFavourites.sort((objA, objB) => {
      return objA.popularity - objB.popularity 
    })
  } else if(popularity === -1){
    filteredFavourites.sort((objA, objB) => {
      return objB.popularity - objA.popularity 
    })
  }

  if(rating === 1){
    filteredFavourites.sort((objA, objB) => {
      return objA.popularity - objB.popularity 
    })
  } else if(rating === -1){
    filteredFavourites.sort((objA, objB) => {
      return objB.vote_average - objA.vote_average 
    })
  }

  // Searching
  filteredFavourites = filteredFavourites.filter((movie) => {
    return (
      movie.title?.toLowerCase().includes(search.toLowerCase()) ||
    movie.name?.toLowerCase().includes(search.toLowerCase())
    ) 
  })

  // Pagination
  let maxPage;
  if(rows > 0){
    let maxPages = Math.ceil(filteredFavourites.length / rows);
    let si = (currPage - 1) * rows;
    let ei = si + rows;
    maxPage = maxPages;
    filteredFavourites = filteredFavourites.slice(si, ei);

  }

  let onPrev = () => {
    if(currPage > 1){
      setCurrPage(currPage - 1);
    }
  }

  let onNext = () => {
    if(currPage < maxPage){
      setCurrPage(currPage + 1);
    }
  }
  {console.log(favourites)}

  return (
    <>
      <div className="mt-8 mr-[15vw] ml-[15vw] flex space-x-3 justify-center flex-wrap">
        {
          genres.map((genre, idx) => {
            return (
              <button className={
          currGenre === genre ? "p-1.5 mb-4 rounded-xl font-bold bg-amber-400" :
          "border-2 p-1.5 mb-4 rounded-xl font-bold border-amber-400 hover:bg-amber-400"
              } 
              key={idx}
              onClick={() => {
                setCurrGenre(genre)
                setCurrPage(1)
              }}
              
              >{genre}</button>
            )
          })
        }
      </div>
      <div
      className="mt-6 flex justify-center space-x-3"
      >
        <input type="text" placeholder="Search..."
          className="p-1.5 border-2 border-amber-400 rounded-xl text-center focus:outline-none focus:border-amber-400"
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value)
            setCurrPage(1)
          }}
        />
        <input type="number"
          placeholder="Rows..." 
          value={rows}
          onChange={(e)=>{
            setRows(e.target.value)
          }}
          onWheel={(e)=>{
            e.target.blur()
          }}
          className="p-1.5 border-2 border-amber-400 rounded-xl text-center focus:outline-none focus:border-amber-400"
        />
      </div>
      
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-bold text-base text-gray-900">Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">
          <div className="flex items-center">
          <div className="h-10 w-10"><img src={up} alt="" 
            onClick={() => {
            setRating(1)
            setPopularity(0)
          }}
          /></div>
          <div className="font-bold text-base">Rating</div>
          <div className="h-10 w-10"><img src={down} alt=""
            onClick={() => {
            setRating(-1)
            setPopularity(0)
          }}
          /></div>
          </div>
        </th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">
          <div className="flex items-center">
          <div className="h-10 w-10"><img src={up} alt=""
          onClick={() => {
            setPopularity(1)
            setRating(0)
          }}
          /></div>
          <div className="font-bold text-base">Popularity</div>
          <div className="h-10 w-10"><img src={down} alt="" 
            onClick={() => {
            setPopularity(-1)
            setRating(0)
          }}
          /></div>
          </div>
        </th>
        <th scope="col" class="px-6 py-4 text-gray-900 font-bold text-base">Genre</th>
        <th scope="col" class="px-6 py-4 font-bold text-base text-gray-900">Remove</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      {
        filteredFavourites.map((movie) => {
          return (
            <tr class="hover:bg-gray-50" key={movie.id}>
        <td class="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="flex space-x-2 items-center">
        <img class="h-[6rem]  w-[10rem] object-fit hidden md:block" src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`} alt=""  />
        <div class="font-medium text-gray-700  text-sm">{movie.title || movie.name}</div>
        </div>
        </td>
        <td class="px-6 py-4">{movie.vote_average}</td>
        <td class="px-6 py-4">{movie.popularity}</td>
        <td class="px-6 py-4">
            {
            movie.genre_ids?.map((id) => {
              return (
                <div class="flex gap-2 m-1" key={id}>
                    <span
                      class="gap-1 rounded-full bg-amber-400 px-2 py-1 text-xs font-semibold text-gray-900"
                    >
                      {genreids[id]}
                    </span>

                  </div>
              )
              })
          }
        </td>
        <td class="px-6 py-4">
          <span onClick={() => {removeEmoji(movie)}}>❌</span>  
        </td>
      </tr>
          )
        })
      }
    </tbody>
  </table>
</div>

      <Pagination pageNum={currPage}
      onPrev={onPrev}
      onNext={onNext}
      ></Pagination>
    </>
  )
}

export default Favourites