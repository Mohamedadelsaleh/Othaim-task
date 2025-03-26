// components/Products.tsx
import React, { useEffect, useState } from "react";
import { getAllProducts, Product } from "../../services/services";
import styles from "./Products.module.scss";
import ProductCard from "@/components/ProductCard/ProductCard";
import Notification from "../Notification/Notification";
import SearchBar from "../SearchBar/SearchBar";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setProducts(products);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Showing cached data.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.productsGrid}>
        {error && <Notification message={error} type="error" visible />}

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            rating={product.rating}
          />
        ))}

        {filteredProducts.length === 0 && !loading && (
          <div className={styles.error}>No products available</div>
        )}
      </div>
    </>
  );
};

export default Products;
