import Navbar from "@/components/NavBar/Navbar";
import { CartProvider } from "@/context/CartContext";
import type { AppProps } from "next/app";
import "@/styles/globals.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
    </CartProvider>
  );
}
