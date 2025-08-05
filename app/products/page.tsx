"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState(1000)
  const [minRating, setMinRating] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, priceRange, minRating, selectedCategory, sortBy])

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products")
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = product.price <= priceRange
      const matchesRating = product.rating.rate >= minRating
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesPrice && matchesRating && matchesCategory
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredProducts(filtered)
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const categories = [...new Set(products.map((product) => product.category))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl animate-bounce">
              🛍️
            </div>
          </div>
          <p className="text-xl text-gray-600 animate-pulse">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
      {/* Header */}
      <header className="bg-white bg-opacity-90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <span className="text-gray-600 group-hover:text-purple-600 transition-colors group-hover:-translate-x-1 transform duration-200">
                  ←
                </span>
                <h1 className="text-2xl font-bold gradient-text">AMAZONIA</h1>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white bg-opacity-80 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105">
                🛒 Cart
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="p-6 bg-white bg-opacity-90 backdrop-blur-lg border border-gray-200 shadow-lg rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🔧</span>
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white bg-opacity-80 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price: ${priceRange}</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating: {minRating}⭐</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white bg-opacity-80 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Discover Amazing Products ({filteredProducts.length})
              </h2>
              <p className="text-gray-600">Find exactly what you're looking for</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white bg-opacity-90 backdrop-blur-lg border border-gray-200 overflow-hidden rounded-lg animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="p-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-colors duration-200"
                      >
                        <span
                          className={`text-lg ${favorites.includes(product.id) ? "text-red-500" : "text-gray-400"}`}
                        >
                          {favorites.includes(product.id) ? "❤️" : "🤍"}
                        </span>
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-purple-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                        <span className="text-sm font-medium ml-1">{product.rating.rate}</span>
                        <span className="text-sm text-gray-500">({product.rating.count})</span>
                      </div>
                      <span className="text-2xl font-bold gradient-text">${product.price}</span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 group-hover:shadow-lg">
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setPriceRange(1000)
                    setMinRating(0)
                    setSelectedCategory("all")
                    setSortBy("default")
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

