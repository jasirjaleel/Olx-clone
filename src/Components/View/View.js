import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection,getDocs,query, where, } from 'firebase/firestore';

function View() {
  const {postDetails} = useContext(PostContext)
  console.log(postDetails);
  const [userDetails, setUser] = useState()
  const {db} = useContext(FirebaseContext)
  useEffect(() => {
    const fetchUserData = async () => {
      if (postDetails) {
        const userId = postDetails.createdBy;
        console.log('user',userId);
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    };
    fetchUserData();
  }, [db, postDetails]);


  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt="Image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.productName}</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.email}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
