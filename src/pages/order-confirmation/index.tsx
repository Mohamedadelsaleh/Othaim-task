// pages/order-confirmation/index.tsx
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";
import styles from "./OrderConfirmation.module.scss";
import Link from "next/link";

const OrderConfirmationPage: React.FC = () => {
  const { state, dispatch, showNotification } = useCart();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/cart");
    }
  }, [state.items, router]);

  const handleConfirmOrder = () => {
    dispatch({ type: "CLEAR_CART" });
    showNotification(
      "Order placed successfully!",
      "success",
      "/assets/done-ring.svg"
    );
    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerHead}>
        <Link href="/cart" passHref>
          <button className={styles.backButton}>
            <img src="/assets/back.svg" alt="back" className={styles.backIcon} />
            <span>Back</span>
          </button>
        </Link>
        <h1>Order Summary</h1>
      </div>
      <div className={styles.itemsContainer}>
        {state.items.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.details}>
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: £{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <h2>Total Amount: £{totalPrice.toFixed(2)}</h2>
      </div>
      <button
        onClick={() => setShowDialog(true)}
        className={styles.confirmButton}
      >
        Place Order
      </button>

      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to place this order?"
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

export default OrderConfirmationPage;
