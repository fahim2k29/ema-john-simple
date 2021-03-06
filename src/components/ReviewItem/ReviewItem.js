import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity, key, price} = props.product;
    const reviewItemStyle={
        borderBottom:'1px solid gray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    };

    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <small>Price: ${price}</small>
            <p>Quantity:{quantity}</p>
            <br/>
            <button 
                className="button"
                onClick={ () => props.removeProduct(key)}>Remove
            </button>
        </div>
    );
};

export default ReviewItem;