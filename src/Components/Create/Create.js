import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import {AuthContext, FirebaseContext} from '../../store/Context'
const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const {storage} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
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
      const storageRef = storage.ref();
      const imageRef = storageRef.child(uniqueName);
      await imageRef.put(image);
      console.log("Image uploaded successfully");
        
        // Optionally, get the download URL to save in your database or use in your application
      const imageUrl = await imageRef.getDownloadURL();
      console.log("Image URL:", imageUrl);
      
      // Now you can proceed with saving other data to Firestore or performing other actions
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
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
