import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import Movie from './Movie';
function Home() {

const [loading, setLoading] = useState(true);
const [movies, setMovies] = useState([]);
const getMovies = async() => {
  try {
      const response = await axios({
        method : 'get',
        url: 'https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year'
      });
      setMovies(response.data.data.movies);
      console.log(movies)
      setLoading(false)
  } catch(err) {
    console.log("Error : ", err);
  }
}

useEffect(() => { 
  getMovies();
}, []);


return(
  <>
  <h1>The Movies! {loading ? null : movies.length}</h1>
  { loading ? (<h1>Loading...</h1>) :
    (<div>
      
      {movies.map((movie, key) => (
        <Movie key={key}
          imageUrl={movie.medium_cover_image}
          title={movie.title}
          summary={movie.summary}
          genres={movie.genres}
          id={movie.id}
        />
     ))}
    </div>)
  }
  </>
); 

}

export default Home;