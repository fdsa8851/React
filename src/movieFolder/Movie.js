import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";


function Movie({imageUrl, title, summary, genres, id}) {

    return(
        <>
        <div>
            <div key={id}>
              <h2><Link to={`/movie/${id}`}>{title}</Link></h2>
              <img alt='moviePohto' src={imageUrl}></img>
              <p>{summary}</p>
              <ul>
                {genres.map((g, index) => (
                  <li key={g}>{g}</li> 
                ))}
              </ul> 
            </div>
          </div>
        </>
    );
}

Movie.propTypes = {
  
  id : PropTypes.number.isRequired,
  imageUrl : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  summary : PropTypes.string.isRequired,
  genres : PropTypes.arrayOf(PropTypes.string).isRequired

}

export default Movie;