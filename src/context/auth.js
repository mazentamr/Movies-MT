import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../features/user/userSlice';
import { auth } from '../firebase/firebase';
import { db } from "../firebase/firebase"
import { setpotoProfil } from '../features/Profile/profileSlice';
import { addSavedInFirebase } from '../features/Saved/savedSlice';
import { addFavoritInFirestor } from '../features/FavoritR/favoritSlice';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLodaing] = useState(true);
  const dispatch = useDispatch();
  
 



  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        if(user){
          dispatch(setUserLogin({
            email: user.email,
            userId: user.uid,
          }))
        }
       
        if (user) {
          const unsubscribe = db.collection('user_move').doc(user.uid)
          unsubscribe.onSnapshot((snap) => {
            dispatch(setpotoProfil({
              photo: snap.data().photo,
            }))

            dispatch(addFavoritInFirestor({
              favorit: snap.data().favorit
            }))
            
            dispatch(addSavedInFirebase({
              saved: snap.data().saved
            }))

          });
        }
        setLodaing(false);
      })
      return unsubscribe;
    } catch (err) { console.log(err) }

  }, [])




  // if (loading) return <SimpleBackdrop open={loading} />;
  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );

};


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