import { IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"
import { deleteFavorit, selectFavorit } from "../features/FavoritR/favoritSlice"
import './favorites.css'
import StarsIcon from '@material-ui/icons/Stars';
import { useEffect, useState } from "react";
import { selectUserId } from "../features/user/userSlice";
import { db } from "../firebase/firebase"
import axios from '../api/axios'
import { infoMovie } from "../api/api";
import DeleteIcon from '@material-ui/icons/Delete';
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


export default function Favorites(props) {
  const favorit = useSelector(selectFavorit)
  const [move, setMove] = useState([])
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState([]);
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const url_img = "https://image.tmdb.org/t/p/original"

  useEffect(() => {
    fetchData();
    if (userId) {
      const unsubscribe = db.collection('user_move').doc(userId)
      unsubscribe.onSnapshot((snap) => {
        if (snap.exists) {
          setItem(snap.data());
        }
      });
    }
  }, [favorit])

  async function fetchData() {
    if (favorit) {
      const respones = await favorit.map(async (item) =>
        item.id ? await axios.get(infoMovie(item.id)) : null
      )
      Promise.all(respones).then((p) => {
        setMove(p);
        setLoading(false)
      })
      return respones
    }

  }

  const deletFavoritInS = async (id) => {
    await db.collection('user_move').doc(userId).set({
      ...item,
      favorit: item.favorit.filter(ite => ite.id != id)
    });
  }



  if (loading) return <SimpleBackdrop open={loading} />;
  return (
    <div className="favorit__move">
      <Typography variant='h5' className="favoritAddreas" >Favorites Movies <StarsIcon></StarsIcon></Typography>

      <div className="Row__list_Fav">
        {
          move.map((item, index) => (
            <div key={index}>
              {
                item ?
                  <div className="Row_img_favorit_p">
                    <Link to={`/list/favorites/${item.data.id}`}>

                      <img
                        className="Row_img_favorit"
                        src={url_img + item.data.poster_path}
                        alt={item.name}
                      />

                    </Link>
                    <IconButton aria-label="delete" edge={false} className="icon_but_delet" onClick={() => {
                      deletFavoritInS(item.data.id);
                      dispatch(deleteFavorit(item.data.id));

                    }} >
                      <DeleteIcon color="secondary" fontSize="large" />
                    </IconButton>
                  </div>
                  : null
              }
            </div>

          ))
        }
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