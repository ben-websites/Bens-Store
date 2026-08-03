
import {
  faAward,
  faBoxOpen,
  faShieldHalved,
  faTruckFast,
  faUsers,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-600 p-10 text-white shadow-xl">

        <p className="font-bold uppercase tracking-[0.3em]">
          About Ben Store
        </p>

        <h1 className="mt-4 text-5xl font-black">
          Fashion That Fits Every Lifestyle
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-100">
          Ben Store is a modern online shopping destination dedicated to
          providing premium fashion, clothing, accessories and everyday
          essentials. We believe shopping should be simple, enjoyable and
          affordable while delivering exceptional quality to every customer.
        </p>

      </div>

      {/* Story */}

      <div className="mt-16 grid gap-10 lg:grid-cols-2">

        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">

          <h2 className="text-3xl font-black text-slate-900">
            Our Story
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Ben Store was created with one simple goal: make online shopping
            easier for everyone. Instead of browsing through complicated
            websites, our customers can quickly discover quality products,
            compare prices, read descriptions and shop with confidence.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Every product in our collection is carefully selected to combine
            quality, style and value. Whether you're looking for everyday
            clothing or something special, Ben Store has something for every
            occasion.
          </p>

        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">

          <h2 className="text-3xl font-black text-slate-900">
            Our Mission
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Our mission is to deliver high-quality fashion products with
            excellent customer service, secure online shopping and fast
            nationwide delivery.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            We focus on customer satisfaction by offering competitive prices,
            trusted products and a smooth shopping experience from browsing to
            checkout.
          </p>

        </div>

      </div>

      {/* Features */}

      <div className="mt-16">

        <h2 className="mb-10 text-center text-4xl font-black">
          Why Choose Ben Store?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

            <FontAwesomeIcon
              icon={faTruckFast}
              className="text-5xl text-emerald-700"
            />

            <h3 className="mt-5 text-xl font-bold">
              Fast Delivery
            </h3>

            <p className="mt-3 text-slate-600">
              Quick and reliable shipping across Pakistan.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

            <FontAwesomeIcon
              icon={faShieldHalved}
              className="text-5xl text-emerald-700"
            />

            <h3 className="mt-5 text-xl font-bold">
              Secure Shopping
            </h3>

            <p className="mt-3 text-slate-600">
              Safe payments and protected customer information.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

            <FontAwesomeIcon
              icon={faAward}
              className="text-5xl text-emerald-700"
            />

            <h3 className="mt-5 text-xl font-bold">
              Premium Quality
            </h3>

            <p className="mt-3 text-slate-600">
              Carefully selected products with excellent quality.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">

            <FontAwesomeIcon
              icon={faHeadset}
              className="text-5xl text-emerald-700"
            />

            <h3 className="mt-5 text-xl font-bold">
              Customer Support
            </h3>

            <p className="mt-3 text-slate-600">
              Friendly support whenever you need assistance.
            </p>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-16 rounded-3xl bg-slate-900 p-10 text-white">

        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <h2 className="text-5xl font-black text-emerald-400">500+</h2>
            <p className="mt-2">Products</p>
          </div>

          <div>
            <h2 className="text-5xl font-black text-emerald-400">5K+</h2>
            <p className="mt-2">Happy Customers</p>
          </div>

          <div>
            <h2 className="text-5xl font-black text-emerald-400">10K+</h2>
            <p className="mt-2">Orders Delivered</p>
          </div>

          <div>
            <h2 className="text-5xl font-black text-emerald-400">99%</h2>
            <p className="mt-2">Customer Satisfaction</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;

