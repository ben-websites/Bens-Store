import Loader from '../components/Loader'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../contextApi/ProductsDataContext'

function Products() {
  const { products, loading, error } = useProducts()

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg border border-stone-200 bg-white p-6 text-left shadow-sm shadow-stone-200/70">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">Shop</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">All products</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Explore everyday essentials, standout pieces, and customer favorites in one clean collection.
        </p>
      </div>

      {loading && <Loader />}
      {error && <p className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
      {!loading && !error && <ProductGrid products={products} />}
    </section>
  )
}

export default Products
