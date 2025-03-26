// services/services.ts
type Rating = {
    rate: number;
    count: number;
  };
  
  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating?: Rating;
    category?: string;
    image: string;
  }
  
  const CACHE_KEY = 'products_cache';
  const CACHE_TIMEOUT = 15 * 60 * 1000;
  
  export const getAllProducts = async (): Promise<Product[]> => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const now = Date.now();
  
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (now - timestamp < CACHE_TIMEOUT) {
        return data;
      }
    }
  
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: now
      }));
      
      return data;
    } catch (error) {
      if (cachedData) {
        const { data } = JSON.parse(cachedData);
        return data; // Return stale data if available
      }
      throw error;
    }
  };
  
  export const syncCartWithAPI = async (cartItems: any[]) => {
    try {
      const response = await fetch('https://fakestoreapi.com/carts', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        })
      });
      
      if (!response.ok) throw new Error('Failed to sync cart');
      return await response.json();
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  };