export default function HeroSection() {
  return (
    <div className="relative bg-gray-900">
      <div className=" max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
          New arrivals are here
        </h1>
        <p className="mt-4 text-xl text-white">
          The new arrivals have, well, newly arrived. Check out the latest options
          from our summer small-batch release while they're still in stock.
        </p>
        <a
          href="#"
          className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
        >
          Shop New Arrivals
        </a>
      </div>
    </div>
  );
}
