import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constent";

export function UseProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/v1/product`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return {
    products,
    isLoading,
    setProducts,
    setIsLoading,
  };
}

