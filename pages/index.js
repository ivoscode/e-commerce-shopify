import Head from "next/head";
import ProductList from "../components/ProductList";
import { getProductsInCollection } from "../lib/shopify";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="bg-red-700">Index page</h1>
        <ProductList products={products} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsInCollection();

  return {
    props: { products },
  };
}
