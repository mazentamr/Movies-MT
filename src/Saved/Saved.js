import { Button, IconButton, Typography } from "@material-ui/core"
import axios from '../api/axios'
import { useDispatch, useSelector } from "react-redux"
import { infoMovie } from "../api/api"
import { deleteSaved, selectSaved } from "../features/Saved/savedSlice"
import './saved.css'
import { useEffect, useState } from "react"
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteIcon from '@material-ui/icons/Delete';
import { selectUserId } from "../features/user/userSlice"
import { db } from "../firebase/firebase"
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

export default function Saved() {
    const saved = useSelector(selectSaved)
    const url_img = "https://image.tmdb.org/t/p/w342"
    const [move, setMove] = useState([])
    const [loding, setLoding] = useState(true)
    const dispatch = useDispatch()
    const [item, setItem] = useState([]);
    const userId = useSelector(selectUserId)
    useEffect(() => {
        fetchData();

        if (userId) {
            const unsubscribe = db.collection('user_move').doc(userId)
            unsubscribe.onSnapshot((snap) => {
                if (snap.exists) {
                    setItem(snap.data());
                    // console.log(snap.data())
                }
            });
        }
    }, [saved])

    async function fetchData() {
        if (saved) {
            const respones = await saved.map(async (item) =>
                item.id ? await axios.get(infoMovie(item.id)) : null
            )
            Promise.all(respones).then((p) => {
                setMove(p);
                setLoding(false)
            })

            return respones
        }

    }

    const deletSavedInS = async (id) => {
        await db.collection('user_move').doc(userId).set({
            ...item,
            saved: item.saved.filter(ite => ite.id != id)
        });
    }

    if (loding) return <SimpleBackdrop open={loding} />;
    return (
        <div className="saved__move">

            <Typography variant='h5' className="SavedAddreas" > Saved Movies  <BookmarkIcon /></Typography>
            <div className="Row__list_Save">
                {
                    move.map((item, index) => (
                        <div key={index} >
                            {
                                item ?
                                    <div>
                                       
                                            <div
                                                className="Row_img_saved"
                                                style={{
                                                    height: "300px",
                                                    backgroundSize: "cover",
                                                    backgroundImage: `url(${url_img}${item.data.poster_path})`,
                                                    backgroundPosition: "center center"
                                                }}

                                            >
                                                <IconButton aria-label="delete" className="" onClick={() => {
                                                    deletSavedInS(item.data.id);
                                                    dispatch(deleteSaved(item.data.id));

                                                }} >
                                                    <DeleteIcon color="secondary" fontSize="large" />
                                                </IconButton>
                                                <Link to={`/list/saved/${item.data.id}`}><div style={{width:"100%", height:"100%"}}></div></Link>

                                            </div>

                                        {/* <Button className="icon_but_delet2" onClick={() => {
                                            deletSavedInS(item.data.id);
                                            dispatch(deleteSaved(item.data.id));

                                        }}><DeleteIcon color="secondary" fontSize="large" /></Button> */}
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



function SimpleBackdrop({ open }) {
    const classes = useStyles();
    return (
        <div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}