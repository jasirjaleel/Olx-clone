import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const {db,storage} = useContext(FirebaseContext)
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const querySnapshot = await getDocs(collection(db,'products'));
        const productList = [];
        querySnapshot.forEach((doc)=>{
          productList.push({ id: doc.id, ...doc.data() });
        })
        setProducts(productList)
      }catch (error){
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, )
  
  return (
    <div className="postParentDiv">
      <div className="moreView">
      <div className="heading">
        <span>Quick Menu</span>
        <span>View more</span>
      </div>
      <div className="cards">
        {products.map((product) => (
          <div className="card" key={product.id} onClick={()=>{
            setPostDetails(product)
            navigate('/post')
          }}>
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src={product.imageUrl} alt={product.productName} />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.productName}</p>
            </div>
            <div className="date">
              <span>{new Date(product.createdAt.seconds * 1000).toDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
