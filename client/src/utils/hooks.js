import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constent";

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

export function useProductsAndPagination() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/v1/product`);
        setProducts(response.data.data);
        setMetadata(response.data.metadata);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePagination = async (page) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/product?page=${page}`
      );
      setProducts(response.data.data);
      setMetadata(response.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    products,
    metadata,
    isLoading,
    setProducts,
    handlePagination,
  };
}
