import { useEffect, useState } from 'react'
import { db } from './firebase'

export const useFirestore = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('user_move')
      .onSnapshot((snap) => {

        let fetched = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setItems(fetched);
        // console.log(snap.query.onSnapshot())
      });
    return unsubscribe;
  }, [])
  // console.log(items)

  const addItem = async (item, userID) => {
    await db.collection('user_move').doc(userID).set({
      ...item,
    });
  };

  const getItem = async (userEmail) => {
     
       db
      .collection('user_move').where('email','==',userEmail)
      .onSnapshot((snap) => {

        // let fetched =[]
        //  snap.forEach((doc) => {
        //   fetched.push(doc.data())
        // });
      
      });

  }


  return { items, addItem, getItem };
}

