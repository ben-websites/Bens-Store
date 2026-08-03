import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { CartContext } from './CartDataContext'

const CART_STORAGE_KEY = 'ben-store-cart'

function getSavedCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getSavedCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product) {
  setCartItems((items) => {
    const alreadyInCart = items.some(
      (item) => item._id === product._id
    );

    if (alreadyInCart) {
      toast.error("This item is already in the cart");
      return items;
    }

    toast.success("Item added to cart");

    return [
      ...items,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
}

  function removeFromCart(id) {
  setCartItems((items) =>
    items.filter((item) => item._id !== id)
  );

  toast.success("Item removed from cart");
}

  function clearCart() {
    setCartItems([])
    toast.success('Cart cleared')
  }

  const cartTotal = useMemo(
  () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
  [cartItems]
);

  const cartCount = cartItems.length

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
