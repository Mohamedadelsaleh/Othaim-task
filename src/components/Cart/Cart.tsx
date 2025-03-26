// components/Cart.tsx
import React from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.scss";
import Link from "next/link";

const Cart: React.FC = () => {
  const { state, dispatch, showNotification } = useCart();

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", id });
    showNotification(
      "Item has been removed successfully",
      "error",
      "/assets/done-ring.svg"
    );
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", id });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", id });
  };

  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {state.items.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <div className={styles.cartItems}>
          {state.items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemTitle}>{item.title}</h3>
                <span className={styles.cartItemDescription}>
                  {item.description}
                </span>
                <p className={styles.cartItemPrice}>{`£${item.price.toFixed(
                  2
                )}`}</p>
                <div className={styles.quantityWrapper}>
                  <div className={styles.cartItemQuantity}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeItemButton}
                  >
                    <img src="/assets/delete.svg" alt="deleteIcon" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {state.items.length > 0 && (
        <div className={styles.orderDetails}>
          <div className={styles.cartTotal}>
            <h3>Total: {`£${totalPrice.toFixed(2)}`}</h3>
          </div>
          <Link href="/order-confirmation">
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
