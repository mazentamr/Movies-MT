import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Grid from '@material-ui/core/Grid';
import './Listmovie.css'
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function Top_rated(props) {
    const [movie, setMovie] = useState([])
    const [page, setPage] = useState(1);
    const [loding ,setLoding]=useState(true)
    const url_img = "https://image.tmdb.org/t/p/w342"

    useEffect(() => {
        async function fetchData() {
            const requast = await axios.get(`${props.location.state.urlMovie}&page=${page}`)
            setMovie(movie.concat(...requast.data.results))
            setLoding(false)
            return requast
        }
        fetchData()
    }, [page])

    const handelClike = () => {
        setPage(page + 1)
    }
    console.log(props);



    
 if (loding) return <SimpleBackdrop open={loding} />;
    return (
        <div className="A_parant">
            <div></div>
            <div className="parant">
                <Typography variant="h6" className="tital">
                    Top rated
                </Typography>
                <Grid container spacing={2} className="contGrad">
                    {
                        movie.map((item, i) =>
                            <Grid item xs={4} sm={3} md={3} lg={3} key={i}>
                                <div>
                                    <Link to={`${props.match.url}/${item.id}`}>
                                        <img
                                            className="Listmovie"
                                            src={`${url_img}${item.poster_path}`}
                                            alt={item.tital}
                                        />
                                    </Link>
                                </div>
                            </Grid>
                        )
                    }
                </Grid>
                <div className="button">
                    <Button variant="contained" size="large" onClick={handelClike}>
                        More movies
                    </Button>
                </div>
            </div>

        </div>
    )
}


function SimpleBackdrop({open}) {
    const classes = useStyles();
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open} >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }