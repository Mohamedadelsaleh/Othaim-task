// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
    const { state } = useCart();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    <span>
                        <img src="/assets/othaim.png" alt="Website Logo" />
                    </span>
                </Link>
            </div>
            <div className={styles.links}>
                <Link href="/">
                    <span>Home</span>
                </Link>
                <Link href="/about">
                    <span>About</span>
                    
                </Link>
                <Link href="/contact">
                    <span>Contact</span>
                </Link>
            </div>
            <div className={styles.cart}>
                <Link href="/cart">
                    <img src="/assets/cart-outline.svg"  />
                    <div className={styles.cartWrapper}>
                        <span className='cart-items-no'>{state.items.length}</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
