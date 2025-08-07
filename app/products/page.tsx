'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProducts } from './productsApi';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  priceRange: number;
  setPriceRange: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  resetFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, priceRange, minRating, selectedCategory, sortBy]);

  const filterProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice = product.price <= priceRange;
      const matchesRating = product.rating.rate >= minRating;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesPrice && matchesRating && matchesCategory;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange(1000);
    setMinRating(0);
    setSelectedCategory('all');
    setSortBy('default');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        searchTerm,
        setSearchTerm,
        priceRange,
        setPriceRange,
        minRating,
        setMinRating,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        favorites,
        toggleFavorite,
        resetFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
