import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import style from "./Home.module.css"

export default function Home() {
  let baseImgURL = `https://image.tmdb.org/t/p/original/`
  const [trendMovies, setTrendMovies] = useState([])
  const [trendTvshows, setTrendTvshows] = useState([])
  // const [trendingPerson, setPerson] = useState([])
  const [loading, setLoading] = useState(false);




  async function getTrendingItems(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=b9bdb09fc05c6f78ab2de960f7cc874e`)
    callback(data.results)
    console.log(data.results)
    if (data.results.length <= 0) {
      setLoading(false)
    } else {
      setLoading(true)
    }
    console.log(data.results.length)
  }
  useEffect(() => {
    getTrendingItems("movie", setTrendMovies)
    getTrendingItems("tv", setTrendTvshows)
    // getTrendingItems("person", setPerson)

  }, [])

  return (
    <div className={style.total}>

      {trendMovies.length > 0 ? <>
        <div>
          <div className="row">
            <div className="col-md-4 d-flex align-items-center">
              <div className="w-100">
                <div className={` w-25 mb-3 ${style.brdr}`}></div>
                <h2>Trending</h2>
                <h2>Movies</h2>
                <h2>To watch now</h2>
                <p className="secondColor">Most watched movies by day</p>
                <div className={` w-100 ${style.brdr}`}></div>
              </div>
            </div>
            {trendMovies.map((movie, index) =>
              <div className="col-md-2 my-3" key={index}>
                <div>
                  <Link to={`/moviedetails/${movie.id}`}>
                    <img src={baseImgURL + movie.poster_path} alt="" className="w-100" />
                    <h5>{movie.title}</h5>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-md-4 d-flex align-items-center">
              <div className="w-100">
                <div className={` w-25 mb-3 ${style.brdr}`}></div>
                <h2>Trending</h2>
                <h2>Tv shows</h2>
                <h2>To watch now</h2>
                <p className="secondColor">Most watched Tv shows by day</p>
                <div className={` w-100 ${style.brdr}`}></div>
              </div>
            </div>
            {trendTvshows.map((tv, index) =>
              <div className="col-md-2 my-3" key={index}>
                <div>
                  <img src={baseImgURL + tv.poster_path} alt="" className="w-100" />
                  <h5>{tv.name}</h5>
                </div>
              </div>
            )}
          </div>



        </div>
      </> : <h1 className="text-center mt-5 pt-5"> <i className='fas fa-spinner fa-spin'></i></h1>}

    </div>

  )
}
