import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {

    const {id} = useParams();
    //console.log(id);

    const getMovie = async() => {
        try {
            const response = await axios({
              method : 'get',
              url: `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            });
            console.log(response);
        } catch(err) {
          console.log("Error : ", err);
        }
      }
      
    useEffect(() => { 
        getMovie();
      }, [])


    return(
        <div>Detail 입니다. </div>
    )

}

export default Detail;