import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import {AuthContext, FirebaseContext} from '../../store/Context'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const {db,storage} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    if (!image) {
      console.log("Please select an image");
      return;
    }
    try {
      const uniqueName = `${Date.now()}-${image.name}`;
      const storageRef = ref(storage, `images/${uniqueName}`);  
      await uploadBytes(storageRef, image); 
      console.log("Image uploaded successfully");
          
        const imageUrl = await getDownloadURL(storageRef);
        console.log("Image URL:", imageUrl);
        
        await addDoc(collection(db, 'products'), {
          productName: name,  
          category: category,
          price: price,
          imageUrl: imageUrl, 
          createdBy: user.uid,  
          createdAt: new Date() 
        });
        navigate('/')
  
        console.log("Product added to Firestore");
  
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input onChange={handleChange} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
