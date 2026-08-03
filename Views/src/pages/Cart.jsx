import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBagShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useCart } from '../contextApi/CartDataContext'

function Cart() {
  const { cartItems, cartTotal, removeFromCart, clearCart } = useCart()

  function handleClearCart() {
    const confirmed = window.confirm('Do you really want to clear the cart?')

    if (confirmed) {
      clearCart()
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto grid min-h-[62vh] max-w-6xl place-items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="max-w-xl rounded-lg border border-stone-200 bg-white p-10 shadow-xl shadow-stone-200/70">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-2xl text-emerald-700">
            <FontAwesomeIcon icon={faBagShopping} />
          </span>
          <h1 className="mt-5 text-4xl font-black text-slate-950">Your cart is empty</h1>
          <p className="mt-3 leading-7 text-slate-600">
            Add products from the shop and they will appear here for review.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-3 rounded bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            Start Shopping <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 text-left sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-800">Cart</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Selected items</h1>
          <p className="mt-3 text-slate-600">Remove anything you do not want before checkout.</p>
        </div>
        <button
          type="button"
          onClick={handleClearCart}
          className="w-fit rounded border border-stone-300 bg-white px-5 py-3 font-bold text-slate-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={item._id}
              className="grid gap-5 rounded-lg border border-stone-200 bg-white p-5 text-left shadow-sm shadow-stone-200/60 sm:grid-cols-[120px_1fr_auto]"
            >
              <Link to={`/products/${item._id}`} className="grid h-32 place-items-center rounded bg-[#fbfaf7] p-4">
                <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
              </Link>
              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                  {item.category}
                </span>
                <h2 className="mt-3 text-xl font-black leading-6 text-slate-950">{item.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
              <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                <p className="text-2xl font-black text-slate-950">${item.price.toFixed(2)}</p>
                <button
                  type="button"
                  onClick={() => removeFromCart(item._id)}
                  className="inline-flex items-center gap-2 rounded bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-700 hover:text-white"
                >
                  <FontAwesomeIcon icon={faTrashCan} /> Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-stone-200 bg-white p-6 text-left shadow-xl shadow-stone-200/70">
          <h2 className="text-2xl font-black text-slate-950">Order summary</h2>
          <div className="mt-6 space-y-4 text-slate-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span className="font-bold text-slate-950">{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-950">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-bold text-emerald-700">Free</span>
            </div>
          </div>
          <div className="mt-6 border-t border-stone-200 pt-6">
            <div className="flex justify-between text-xl font-black text-slate-950">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-slate-950"
            >
              Checkout
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Cart
