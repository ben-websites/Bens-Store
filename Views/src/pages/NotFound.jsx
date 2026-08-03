import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-6xl place-items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.5em] text-emerald-800">404</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you opened does not exist.</p>
        <Link to="/" className="mt-8 inline-block rounded bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-slate-950">
          Go Home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
