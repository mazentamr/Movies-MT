import { useEffect, useState } from "react"
import axios from '../api/axios';
import '../css.css'
import Unfact_loging from './Unfact_loging'
import Typography from '@material-ui/core/Typography';
export default function RowMove({ tital, url_movie }) {
    const [loding, setLoding] = useState(false)
    const [movies, setMovies] = useState([])
    const url_img = "https://image.tmdb.org/t/p/original"
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axios.get(url_movie);
            setMovies(response.data.results);
            setLoding(true);
            return response
            }catch(err){
                console.log(console.error(err))
            }
            
        }
        fetchData()
    }, [])
   
    if (!loding) {
        return <Unfact_loging tital={tital} />
    }
    else {
        return (

            <div className="Row__move">
                <Typography variant="h5" style={{color:"#fff", margin:"10px"}} className="Row__tital">{tital}</Typography>
                <div className="Row__list">
                    {
                        movies.map((item,i) =>
                            <div key={i}>
                              
                                <img
                                    className="Row__img"
                                    src={`${url_img}${item.poster_path}`}
                                    alt={item.tital}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}



