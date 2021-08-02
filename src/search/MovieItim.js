import './search.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";



const url_img = "https://image.tmdb.org/t/p/original"
export default function MovieItim({ name, id, urlImg }) {
    return (
        <div>
            <div className='row-search'>
                <div>
                    <Link to={`/list/search/${id}`}>

                        <img
                            className="img_search"
                            src={`${url_img}${urlImg}`}
                            alt={name}
                        />
                    </Link>
                </div>
                <div className="detal">
                    <div className="detal2">
                        <Typography variant="h5">{name}</Typography>

                    </div>
                    <div className="detal2">
                        <Link to={`/list/search/${id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" >
                                detals
                            </Button>
                        </Link>

                    </div>


                </div>

            </div>
        </div>
    )
}