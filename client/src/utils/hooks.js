import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constent";

export function useProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

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

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/v1/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCategory();
  }, []);

  return {
    isLoading,
    categories,
    setCategories,
  };
}
