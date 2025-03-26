import Head from "next/head";
import Products from "../components/products/Products";
import styles from "../styles/Home.module.scss";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Othaim Ecommerce app</title>
        <meta
          name="description"
          content="A simple Ecommerce built with Next.js and TypeScript"
        />
        <link rel="icon" href="/assets/othaim.png" />
      </Head>

      <main className={styles.main}>
        <Products />
      </main>
    </div>
  );
}
