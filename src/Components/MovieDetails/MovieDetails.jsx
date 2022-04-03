import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from "./MovieDetails.module.css"

export default function MovieDetails() {
    let baseImgURL = `https://image.tmdb.org/t/p/original/`
    const [movies, setMovies] = useState([])
    let params = useParams()

    async function getMovieDetails() {
        let { data } = await axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=b9bdb09fc05c6f78ab2de960f7cc874e&language=en-US`)
        setMovies(data)
        console.log(data)
    }
    useEffect(() => {
        getMovieDetails()

    });
    return (
        <div className="container ">
        

           
                <div className={style.content}>
                    <div className={style.leftSide}>
                        <img src={baseImgURL + movies.poster_path} alt="" />
                    </div>
                    <div className={style.rightSide}>
                        <h1>{movies.title}</h1>
                        <h2>{movies.tagline}</h2>
                        <div className={style.classifications}>
                            {/* <span className="alert alert-info">{movies.genres[0]}</span>
                        <span className="alert alert-info">{movies.genres[1]}</span> */}
                            <span className="alert alert-info">Thriller</span>
                            <span className="alert alert-info">Drama</span>
                            <span className="alert alert-info">Action</span>
                        </div>
                        <div className={style.details}>
                            <p>Vote: {movies.vote_average}</p>
                            <p>Vote count: {movies.vote_count}</p>
                            <p>populartiy: {movies.popularity}</p>
                            <p>release date: {movies.release_date}</p>
                        </div>
                        <h3>{movies.overview}
                        </h3>
                    </div>
                </div>
        </div>
    )
}
