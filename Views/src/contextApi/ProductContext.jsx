import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { ProductContext } from './ProductsDataContext'

const API_URL = "http://localhost:3000/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const res = await axios.get(API_URL);

        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          setProducts(res.data);
        }
        setError('')
      } catch {
        setError('Products could not be loaded. Please try again later.')
        toast.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

 const featuredProducts = useMemo(() => {
  return products.slice(0, 4);
}, [products]);


  const getProductById = useCallback(
  (id) => products.find((product) => product._id === id),
  [products]
);

  return (
    <ProductContext.Provider
  value={{
    products,
    featuredProducts,
    loading,
    error,
    getProductById,
  }}
>
  {children}
</ProductContext.Provider>
  )
}
