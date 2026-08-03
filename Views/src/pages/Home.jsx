import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBagShopping, faGem, faShieldHalved, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../contextApi/ProductsDataContext'

function Home() {
  const { featuredProducts, loading, error } = useProducts()

  return (
    <>
      <section className="overflow-hidden bg-[#e8dfcf]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-18 sm:px-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="text-left">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-800">New season edit</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
              Modern essentials for everyday style.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
              Discover polished clothing, accessories, and everyday pieces selected for confident, effortless shopping.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 rounded bg-slate-950 px-5 py-3 font-bold text-white shadow-lg shadow-slate-300 transition hover:bg-emerald-700"
              >
                Shop Products <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center gap-3 rounded border border-slate-300 bg-white/70 px-5 py-3 font-bold text-slate-900 transition hover:bg-white"
              >
                View Cart <FontAwesomeIcon icon={faBagShopping} />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/80 bg-white/85 p-4 shadow-2xl shadow-stone-300/70 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded bg-slate-950 p-6 text-left text-white sm:row-span-2">
                <FontAwesomeIcon icon={faGem} className="text-4xl text-amber-300" />
                <p className="mt-8 text-5xl font-black">New</p>
                <p className="mt-2 text-sm text-slate-300">Elevated pieces for your daily wardrobe</p>
              </div>
              <div className="rounded border border-stone-200 bg-[#fbfaf7] p-5 text-left">
                <FontAwesomeIcon icon={faTruckFast} className="text-3xl text-emerald-700" />
                <p className="mt-4 font-black text-slate-950">Quick delivery</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Reliable shipping on selected orders.</p>
              </div>
              <div className="rounded border border-stone-200 bg-[#fbfaf7] p-5 text-left">
                <FontAwesomeIcon icon={faShieldHalved} className="text-3xl text-emerald-700" />
                <p className="mt-4 font-black text-slate-950">Secure checkout</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Shop with a smooth, protected cart.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-3 text-left sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">Featured</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Handpicked for you</h2>
          </div>
          <Link to="/products" className="font-bold text-emerald-700 hover:text-slate-950">
            View all products
          </Link>
        </div>
        {loading && <Loader />}
        {error && <p className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
        {!loading && !error && <ProductGrid products={featuredProducts} />}
      </section>
    </>
  )
}

export default Home
