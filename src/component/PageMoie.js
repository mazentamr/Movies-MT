import React, { Fragment } from 'react';
import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { infoMovie, Actors, Belongs, Videos } from '../api/api'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../css.css'
import RowMove from '../component/RowMove'
import YouTube from 'react-youtube';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorit } from '../features/FavoritR/favoritSlice';
import { selectUserId } from '../features/user/userSlice';
import { db } from '../firebase/firebase';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { addSaved } from '../features/Saved/savedSlice';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    text: {
        marginTop: "30px",
        color: "#fff"
    },
    textCategory: {
        marginLeft: "30px",
        textAlign: "start",
        color: "#fff"
    },
    favorite: {
        marginLeft: "200px"
        // margin:"auto"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },

}));

//احصل على الممثلين وطاقم العمل لفيلم.
//https://api.themoviedb.org/3/movie/615678/credits?api_key=c6788a2ac30e2cf0fd5943a27d615227&language=en-US


// احصل على المعلومات الأساسية حول الفيلم.
//https://api.themoviedb.org/3/movie/460465?api_key=c6788a2ac30e2cf0fd5943a27d615227&language=en-US

export default function PageMoie(props) {
    const classes = useStyles();
    const url_img = "https://image.tmdb.org/t/p/original"
    const id = props.match.params.id
    const [dataMovie, setDatamMovie] = useState({})
    const [actorsMovie, setActorsMovie] = useState([])
    const [belongsMovie, setBelongsMovies] = useState([])
    const [videosMovie, setVideoMovie] = useState("")
    const [colorFavorit, setColorFavorit] = useState({ color: "#fff" })
    const [ColorSaved, setColorSaved] = useState({ color: "#fff" })
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const [item, setItem] = useState([]);
    const [loding ,setLoding]=useState(true)


    useEffect(() => {
        async function fetchData() {

            try {
                const requast = await axios.get(infoMovie(id))
                const actors = await axios.get(Actors(id))
                const belongs = await axios.get(Belongs(id))
                const video = await axios.get(Videos(id))
                setActorsMovie(actors.data.cast.splice(0, 8))
                setBelongsMovies(belongs.data.results)
                setDatamMovie(requast.data)
                setVideoMovie(video.data.results)
                setLoding(false)
                return {
                    requast,
                    belongs,
                    actors,
                    video
                }
            } catch (err) {
                console.log(console.error(err))
            }

        }
        fetchData()


        if (userId) {
            const unsubscribe = db.collection('user_move').doc(userId)
            unsubscribe.onSnapshot((snap) => {
                if (snap.exists) {
                    setItem(snap.data());
                    // console.log(snap.data())
                }
            });
        }
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };


    const hundelClikFavorit = () => {
        setColorFavorit({ color: "#000" })
        dispatch(addFavorit({ id }));
        addFavoritInF();
    }

    const addFavoritInF = async () => {

        await db.collection('user_move').doc(userId).set({
            ...item,
            favorit: [...item.favorit, { id: id }]
        });
    }

    const hundelClikSaved = () => {
        setColorSaved({ color: "#000" })
        dispatch(addSaved({ id }));
        addSavedInS();
    }

    const addSavedInS = async () => {
        await db.collection('user_move').doc(userId).set({
            ...item,
            saved: [...item.saved, { id: id }]
        });
    }
    if (loding) return <SimpleBackdrop open={loding} />;
    return (
        <div className="pageMovie">
            <Container >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div className="stor__text">

                            <Typography variant="h6" className={classes.text} >Story</Typography>
                            <Typography variant="caption" className={classes.text} >{dataMovie.overview} </Typography>
                            <br />
                            <br />
                            <hr />
                            <br />
                            <div>
                                {/* <Typography className={classes.textCategory} >Category :
                                    {
                                        dataMovie.genres.map(item => <span> {item.name} ,</span>)
                                    }
                                </Typography> */}

                                <Typography className={classes.textCategory} >Vote Average :
                                    {
                                        dataMovie?.vote_average
                                    } ⭐
                                    {/* {sFavorite.map(item =><li>{item}</li>)} */}
                                </Typography>
                                <Typography className={classes.textCategory} >Release Date :
                                    {
                                        dataMovie?.release_date
                                    }
                                </Typography>
                            </div>

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div className="stor__text">
                            <Typography variant="h6" className={classes.text} >{dataMovie?.original_title || dataMovie?.title || dataMovie?.original_name}</Typography>
                            <img
                                className="profil_img"
                                src={url_img + dataMovie.poster_path}
                            />
                        </div>
                        <div className={classes.favorite}>
                            <SnackbarProvider maxSnack={3}>
                                <Fragment>
                                    <MyApp hundelClikFavorit={hundelClikFavorit} hundelClikSaved={hundelClikSaved} colorFavorit={colorFavorit} ColorSaved={ColorSaved}/>
                                </Fragment>
                            </SnackbarProvider>
                        </div>

                    </Grid>
                </Grid>
                <br />
                <br />
                <Typography variant="h6" className={classes.text} >Actors</Typography>
                <br />
                <br />
                <Grid container justify="space-between" spacing={3}>
                    {


                        actorsMovie.map((item, i) =>
                            <Grid item xs={3} sm={3} md={1} key={i} >
                                <img
                                    className="Actor_img"
                                    src={`https://image.tmdb.org/t/p/w92${item.profile_path}`}
                                    alt={item.name}
                                />
                                <Typography variant="h6" className={classes.text} >{item.name}</Typography>
                            </Grid>
                        )
                    }
                </Grid>
                {/* </div> */}
                <br />
                <br />
                <YouTube videoId={videosMovie[0]?.key || videosMovie[1]?.key || videosMovie[2]?.key} opts={opts} />
                <br />
                <br />
                <RowMove tital="Similar movies" url_movie={Belongs(id)}></RowMove>
            </Container>
        </div>
    )
}

function MyApp({hundelClikFavorit ,hundelClikSaved ,colorFavorit,ColorSaved}) {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickSaved = () => {
        enqueueSnackbar('Save this movie .');
    };
    const handleClickFavorit = () => {
        enqueueSnackbar('Favorit this movie .');
    };

    return (
        <React.Fragment>
            <BottomNavigationAction label="Favorites" onClick={() => { hundelClikFavorit();  handleClickFavorit() }} style={colorFavorit} icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Bookmarks" onClick={()=>{hundelClikSaved(); handleClickSaved()}} style={ColorSaved} icon={<BookmarksIcon />} /> 
        </React.Fragment>
    );
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