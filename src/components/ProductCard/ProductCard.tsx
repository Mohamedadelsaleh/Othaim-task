import React, { useEffect, useState } from "react";
import styles from './ProductCard.module.scss';
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  rating
}) => {

  const { dispatch, showNotification } = useCart();

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      product: { id, title, description, price, image }
    });
    showNotification('Item has been added successfully', 'success', '/assets/done-ring.svg');
  };

  return (
    <div className={styles.productCard}>
        <div className={styles.ImageWrapper}>
            <img src={image} alt={title} className={styles.productImage} />
        </div>
        <div className={styles.textWrapper}>
          <h3 className={styles.productTitle}>{title}</h3>
          <span className={styles.productDescription}>{description}</span>
          {rating && (
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              <div className={styles.starsBackground}>★★★★★</div>
              <div 
                className={styles.starsForeground} 
                style={{ width: `${(rating.rate / 5) * 100}%` }}
              >
                ★★★★★
              </div>
            </div>
            <span className={styles.ratingCount}>({rating.count})</span>
          </div>
        )}
        </div>
        <div className={styles.cardFooterWrapper}>
          <button onClick={addToCart} className={styles.addToCartButton}> 
            <span>Add to cart</span>
            <img src="/assets/plus.svg" alt="plusIcon" /> 
          </button>
          <div className={styles.priceWrapper}>
            <p className={styles.productPrice}>{`£${price.toFixed(2)}`}</p>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
