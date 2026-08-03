import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBell,
  faMagnifyingGlass,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

function Topbar() {
  return (
    <header className="border-b border-stone-200 bg-white px-8 py-5">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-black text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back, Admin 👋
          </p>

        </div>

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative hidden lg:block">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-72 rounded-xl border border-stone-300 py-3 pl-11 pr-4 outline-none focus:border-emerald-700"
            />

          </div>

          {/* Notification */}

          <button className="relative flex h-12 w-12 items-center justify-center rounded-xl border hover:bg-stone-100">

            <FontAwesomeIcon
              icon={faBell}
            />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          {/* Profile */}

          <button className="flex items-center gap-3 rounded-xl border px-4 py-2 hover:bg-stone-100">

            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-3xl text-emerald-800"
            />

            <div className="hidden text-left md:block">

              <p className="font-bold">
                Administrator
              </p>

              <p className="text-sm text-slate-500">
                admin@benstore.com
              </p>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
}

export default Topbar;