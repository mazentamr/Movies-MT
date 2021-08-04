import PermIdentityIcon from '@material-ui/icons/PermIdentity'; import '../css.css'
import IconButton from '@material-ui/core/IconButton';
import { useRef } from 'react'
import Typography from '@material-ui/core/Typography';
import '../css.css'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setpotoProfil } from "../features/Profile/profileSlice"
import { selectUserEmail, selectUserId } from '../features/user/userSlice';
import { selectUserPhoto } from "../features/Profile/profileSlice"
import { db, storage } from "../firebase/firebase"
import { useState } from 'react';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },

    inputPac: {
        position: "relative", top: "-45px", left: "100px"
    }
}));



export default function List_pr() {
    const classes = useStyles();
    const userEmail = useSelector(selectUserEmail);
    const userPhoto = useSelector(selectUserPhoto);
    const userId = useSelector(selectUserId);
    const [progress, setProgress] = useState(0);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const [item, setItem] = useState([]);

    useEffect(() => {
        if(userId){
            const unsubscribe = db.collection('user_move').doc(userId)
            unsubscribe.onSnapshot((snap) => {
                if (snap.exists) {
                    setItem(snap.data());
                    console.log(snap.data())
                }
            });
        }
        
    }, [])


    const uploadImage = (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref(file.name);

        storageRef.put(file).on(
            'state_changed',
            (snap) => {
                let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percent);

            },
            (err) => console.log(err),
            async () => {
                const url = await storageRef.getDownloadURL();
                await db.collection('user_move').doc(userId).set({
                    ...item,
                    photo: url,
                    // createdAt: Date.now(),
                });
                // addItemInF(userEmail, url);
                dispatch(setpotoProfil({
                    photo: url,
                }))
                setProgress(0);
                inputRef.current.value = '';
            }
        )

    }

 
    return (
        <div>
            {
                userEmail &&
                <>
                    <div className="profile">

                        {
                            userPhoto ? <img src={userPhoto} alt="" style={{ height: "150px", width: "150px", borderRadius: "50%" }} /> : <PermIdentityIcon style={{ fontSize: "150px", color: "#999" }} />
                        }

                        <input className={classes.input} id="icon-button-file" type="file" onChange={uploadImage} ref={inputRef} />
                        <label htmlFor="icon-button-file"  >

                            <IconButton className={classes.inputPac} multiple color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                    <div>
                        <Typography variant="h6" align="center" > {userEmail} </Typography>
                    </div>
                    <CircularProgress variant="determinate" value={progress} />
                </>
            }
        </div>
    )
}