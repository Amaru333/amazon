import React from 'react';
import '../style/homeproduct.css';

function HomeProduct( {image, title, price, rating} ) {
    return (
        <div className="homeProduct">
            <img src={image} alt={title} className="homeProductImage" />
            <div className="homeProductInfo">
                <p className="homeProductTitle">{title}</p>
                <div className="homeProductPrice">
                    <small>₹</small>
                    <strong>{price}</strong>
                </div>
                <div className="homeProductRating">
                    {Array(rating).fill().map((_,i) => (
                        <p>⭐</p>
                    ))}
                </div>
            </div>
            <button className="homeAddToCart">Add to cart</button>
        </div>
    )
}

export default HomeProduct
